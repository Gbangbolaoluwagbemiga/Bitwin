;; BitTrust Core Lending Contract
;; A reputation-based micro-lending platform on Stacks

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))
(define-constant err-insufficient-collateral (err u103))
(define-constant err-loan-active (err u104))
(define-constant err-loan-not-active (err u105))
(define-constant err-invalid-amount (err u106))
(define-constant err-already-exists (err u107))
(define-constant err-insufficient-balance (err u108))

;; Data Variables
(define-data-var loan-nonce uint u0)
(define-data-var platform-fee-rate uint u250) ;; 2.5% in basis points

;; Data Maps
(define-map loans
  { loan-id: uint }
  {
    borrower: principal,
    lender: principal,
    amount: uint,
    collateral: uint,
    interest-rate: uint, ;; Annual rate in basis points (e.g., 1000 = 10%)
    duration: uint, ;; In blocks
    start-block: uint,
    due-block: uint,
    repaid-amount: uint,
    status: (string-ascii 20), ;; "active", "repaid", "defaulted", "liquidated"
    collateral-ratio: uint ;; Percentage (e.g., 150 = 150%)
  }
)

(define-map user-stats
  { user: principal }
  {
    total-borrowed: uint,
    total-lent: uint,
    active-loans-as-borrower: uint,
    active-loans-as-lender: uint,
    total-repaid: uint,
    defaults: uint
  }
)

(define-map loan-offers
  { offer-id: uint }
  {
    lender: principal,
    amount: uint,
    interest-rate: uint,
    duration: uint,
    min-collateral-ratio: uint,
    min-reputation: uint,
    active: bool
  }
)

(define-data-var offer-nonce uint u0)

;; Read-only functions
(define-read-only (get-loan (loan-id uint))
  (map-get? loans { loan-id: loan-id })
)

(define-read-only (get-user-stats (user principal))
  (default-to
    { total-borrowed: u0, total-lent: u0, active-loans-as-borrower: u0, 
      active-loans-as-lender: u0, total-repaid: u0, defaults: u0 }
    (map-get? user-stats { user: user })
  )
)

(define-read-only (get-loan-offer (offer-id uint))
  (map-get? loan-offers { offer-id: offer-id })
)

(define-read-only (calculate-repayment-amount (loan-id uint))
  (let
    (
      (loan (unwrap! (get-loan loan-id) (err err-not-found)))
      (principal-amount (get amount loan))
      (interest-rate (get interest-rate loan))
      (duration (get duration loan))
    )
    (ok (+ principal-amount (/ (* principal-amount interest-rate) u10000)))
  )
)

(define-read-only (is-loan-overdue (loan-id uint))
  (let
    (
      (loan (unwrap! (get-loan loan-id) (err err-not-found)))
    )
    (ok (> stacks-block-height (get due-block loan)))
  )
)

;; Public functions

;; Create a loan offer
(define-public (create-loan-offer (amount uint) (interest-rate uint) (duration uint) 
                                   (min-collateral-ratio uint) (min-reputation uint))
  (let
    (
      (offer-id (var-get offer-nonce))
    )
    ;; Lock funds in contract (lender deposits)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (map-set loan-offers
      { offer-id: offer-id }
      {
        lender: tx-sender,
        amount: amount,
        interest-rate: interest-rate,
        duration: duration,
        min-collateral-ratio: min-collateral-ratio,
        min-reputation: min-reputation,
        active: true
      }
    )
    (var-set offer-nonce (+ offer-id u1))
    (ok offer-id)
  )
)

;; Accept a loan offer
(define-public (accept-loan-offer (offer-id uint) (collateral-amount uint))
  (let
    (
      (offer (unwrap! (get-loan-offer offer-id) err-not-found))
      (loan-id (var-get loan-nonce))
      (lender (get lender offer))
      (amount (get amount offer))
      (collateral-ratio (if (> collateral-amount u0)
                           (/ (* collateral-amount u100) amount)
                           u0))
    )
    (asserts! (get active offer) err-not-found)
    (asserts! (>= collateral-ratio (get min-collateral-ratio offer)) err-insufficient-collateral)
    
    ;; Transfer collateral to contract escrow
    (if (> collateral-amount u0)
      (try! (stx-transfer? collateral-amount tx-sender (as-contract tx-sender)))
      true
    )
    
    ;; Transfer loan amount from contract to borrower
    (try! (stx-transfer? amount lender tx-sender))
    
    ;; Create loan record
    (map-set loans
      { loan-id: loan-id }
      {
        borrower: tx-sender,
        lender: lender,
        amount: amount,
        collateral: collateral-amount,
        interest-rate: (get interest-rate offer),
        duration: (get duration offer),
        start-block: stacks-block-height,
        due-block: (+ stacks-block-height (get duration offer)),
        repaid-amount: u0,
        status: "active",
        collateral-ratio: collateral-ratio
      }
    )
    
    ;; Update user stats
    (update-user-stats-borrow tx-sender amount)
    (update-user-stats-lend lender amount)
    
    ;; Deactivate offer
    (map-set loan-offers { offer-id: offer-id } (merge offer { active: false }))
    
    (var-set loan-nonce (+ loan-id u1))
    (ok loan-id)
  )
)

;; Repay loan
(define-public (repay-loan (loan-id uint) (amount uint))
  (let
    (
      (loan (unwrap! (get-loan loan-id) err-not-found))
      (borrower (get borrower loan))
      (lender (get lender loan))
      (total-repayment (unwrap! (calculate-repayment-amount loan-id) err-not-found))
      (new-repaid (+ (get repaid-amount loan) amount))
    )
    (asserts! (is-eq tx-sender borrower) err-unauthorized)
    (asserts! (is-eq (get status loan) "active") err-loan-not-active)
    (asserts! (> amount u0) err-invalid-amount)
    
    ;; Transfer repayment
    (try! (stx-transfer? amount tx-sender lender))
    
    ;; Update loan
    (if (>= new-repaid total-repayment)
      (begin
        ;; Loan fully repaid
        (map-set loans { loan-id: loan-id } (merge loan { 
          repaid-amount: new-repaid,
          status: "repaid"
        }))
        ;; Return collateral from contract to borrower
        (if (> (get collateral loan) u0)
          (try! (stx-transfer? (get collateral loan) (as-contract tx-sender) borrower))
          true
        )
        ;; Update stats
        (update-user-stats-repay borrower (get amount loan))
        (update-user-stats-lend-complete lender)
      )
      ;; Partial repayment
      (map-set loans { loan-id: loan-id } (merge loan { repaid-amount: new-repaid }))
    )
    
    (ok true)
  )
)

;; Liquidate defaulted loan
(define-public (liquidate-loan (loan-id uint))
  (let
    (
      (loan (unwrap! (get-loan loan-id) err-not-found))
      (lender (get lender loan))
    )
    (asserts! (is-eq tx-sender lender) err-unauthorized)
    (asserts! (is-eq (get status loan) "active") err-loan-not-active)
    (asserts! (unwrap! (is-loan-overdue loan-id) err-not-found) err-loan-active)
    
    ;; Transfer collateral from contract to lender
    (if (> (get collateral loan) u0)
      (try! (stx-transfer? (get collateral loan) (as-contract tx-sender) lender))
      true
    )
    
    ;; Update loan status
    (map-set loans { loan-id: loan-id } (merge loan { status: "liquidated" }))
    
    ;; Update borrower stats (add default)
    (let
      (
        (borrower (get borrower loan))
        (stats (get-user-stats borrower))
      )
      (map-set user-stats
        { user: borrower }
        (merge stats { 
          defaults: (+ (get defaults stats) u1),
          active-loans-as-borrower: (- (get active-loans-as-borrower stats) u1)
        })
      )
    )
    
    (ok true)
  )
)

;; Private functions
(define-private (update-user-stats-borrow (user principal) (amount uint))
  (let
    (
      (stats (get-user-stats user))
    )
    (map-set user-stats
      { user: user }
      {
        total-borrowed: (+ (get total-borrowed stats) amount),
        total-lent: (get total-lent stats),
        active-loans-as-borrower: (+ (get active-loans-as-borrower stats) u1),
        active-loans-as-lender: (get active-loans-as-lender stats),
        total-repaid: (get total-repaid stats),
        defaults: (get defaults stats)
      }
    )
  )
)

(define-private (update-user-stats-lend (user principal) (amount uint))
  (let
    (
      (stats (get-user-stats user))
    )
    (map-set user-stats
      { user: user }
      {
        total-borrowed: (get total-borrowed stats),
        total-lent: (+ (get total-lent stats) amount),
        active-loans-as-borrower: (get active-loans-as-borrower stats),
        active-loans-as-lender: (+ (get active-loans-as-lender stats) u1),
        total-repaid: (get total-repaid stats),
        defaults: (get defaults stats)
      }
    )
  )
)

(define-private (update-user-stats-repay (user principal) (amount uint))
  (let
    (
      (stats (get-user-stats user))
    )
    (map-set user-stats
      { user: user }
      (merge stats {
        total-repaid: (+ (get total-repaid stats) amount),
        active-loans-as-borrower: (- (get active-loans-as-borrower stats) u1)
      })
    )
  )
)

(define-private (update-user-stats-lend-complete (user principal))
  (let
    (
      (stats (get-user-stats user))
    )
    (map-set user-stats
      { user: user }
      (merge stats {
        active-loans-as-lender: (- (get active-loans-as-lender stats) u1)
      })
    )
  )
)
