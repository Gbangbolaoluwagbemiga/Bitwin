# 🚀 BitTrust - Reputation-Based Lending on Stacks

![BitTrust Banner](https://img.shields.io/badge/Stacks-Blockchain-5546FF?style=for-the-badge&logo=stacks&logoColor=white)
![Clarity](https://img.shields.io/badge/Clarity-Smart_Contracts-00D4FF?style=for-the-badge)
![Bitcoin](https://img.shields.io/badge/Secured_by-Bitcoin-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white)

**BitTrust** is a decentralized peer-to-peer micro-lending platform built on Stacks that combines Bitcoin's security with innovative on-chain reputation scoring. Build credit history, access flexible loans, and earn yield through trustless lending.

## ✨ Features

### 🏦 Flexible Lending Options
- **Over-collateralized loans**: Traditional DeFi lending with collateral protection
- **Partially-collateralized loans**: Reduced collateral for high-reputation borrowers
- **Uncollateralized loans**: Credit-based lending for trusted users (750+ reputation score)

### 📊 On-Chain Reputation System
- Dynamic credit scoring (0-1000 scale)
- Transparent reputation algorithm
- Rewards for successful repayments (+20 points on-time, +10 late)
- Penalties for defaults (-100 points)
- Reputation-based borrowing limits and interest rates

### 🔒 Bitcoin-Secured
- Leverages Stacks' connection to Bitcoin for settlement finality
- Immutable transaction history
- Decentralized and censorship-resistant

### 💎 Premium User Experience
- Modern glassmorphism UI design
- Real-time wallet integration (Hiro/Leather)
- Responsive mobile-first design
- Smooth animations and micro-interactions

## 🏗️ Architecture

### Smart Contracts (Clarity)

#### `bittrust-core.clar`
Core lending contract managing:
- Loan creation and lifecycle
- Collateral management
- Repayment processing
- Liquidation mechanism
- User statistics tracking

#### `reputation-system.clar`
Reputation scoring system featuring:
- Credit score calculation
- Loan history tracking
- Borrowing limit computation
- Interest rate recommendations
- Reputation history logging

### Frontend (Vanilla JS)
- **index.html**: Single-page application structure
- **styles.css**: Premium dark mode design with glassmorphism
- **app.js**: Stacks wallet integration and contract interactions

## 🚀 Quick Start

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet) v3.11.0+
- [Node.js](https://nodejs.org/) v16+ (for local development server)
- [Hiro Wallet](https://wallet.hiro.so/) or [Leather Wallet](https://leather.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gbangbolaoluwagbemiga/Bitwin.git
   cd Bitwin
   ```

2. **Check smart contracts**
   ```bash
   clarinet check
   ```

3. **Run local development server**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🧪 Testing

### Test Smart Contracts
```bash
# Run Clarinet console
clarinet console

# Test contract functions
(contract-call? .bittrust-core get-user-stats tx-sender)
(contract-call? .reputation-system get-reputation tx-sender)
```

### Deploy to Testnet
```bash
# Configure deployment settings
clarinet deployments generate --testnet

# Deploy contracts
clarinet deployments apply --testnet
```

## 📖 Usage Guide

### For Lenders

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **Navigate to Lend**: Go to the "Lend" tab
3. **Create Loan Offer**: Fill in:
   - Borrower address
   - Loan amount (STX)
   - Interest rate (%)
   - Loan duration (blocks)
   - Minimum collateral ratio (%)
4. **Submit Transaction**: Approve the transaction in your wallet

### For Borrowers

1. **Build Reputation**: Initialize your reputation score
2. **View Loan Offers**: Check available loans in the "Borrow" tab
3. **Accept Loan**: Provide required collateral and accept offer
4. **Repay Loan**: Make repayments to build credit score
5. **Unlock Benefits**: Higher scores = lower rates + higher limits

### Reputation Scoring

Your credit score is calculated based on:
- **Repayment Rate** (0-400 points): Percentage of loans successfully repaid
- **Volume** (0-300 points): Total lending/borrowing volume
- **Loan Count** (0-200 points): Number of completed loans
- **Base Score** (100 points): Starting credit
- **Default Penalty** (-100 points per default)

**Score Benefits:**
- **0-500**: Standard rates (15-25%), collateral required
- **500-750**: Reduced rates (10-15%), partial collateral
- **750-1000**: Best rates (5-10%), uncollateralized loans available

## 🔧 Configuration

### Update Contract Addresses

After deploying to testnet/mainnet, update `app.js`:

```javascript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_ADDRESS';
const NETWORK = 'testnet'; // or 'mainnet'
```

### Customize Interest Rates

Modify reputation-based rates in `reputation-system.clar`:

```clarity
(define-read-only (get-recommended-interest-rate (user principal))
  ;; Adjust formula: Score 1000 = 5%, Score 500 = 15%, Score 0 = 25%
  (ok (- u2500 (/ (* score u20) u100)))
)
```

## 🛠️ Development

### Project Structure
```
Bitwin/
├── contracts/
│   ├── bittrust-core.clar          # Core lending logic
│   └── reputation-system.clar      # Reputation scoring
├── tests/                          # Contract tests
├── settings/                       # Network configurations
├── index.html                      # Frontend UI
├── styles.css                      # Styling
├── app.js                          # Application logic
├── Clarinet.toml                   # Clarinet config
└── README.md                       # Documentation
```

### Adding New Features

1. **Smart Contract Changes**: Edit `.clar` files and run `clarinet check`
2. **Frontend Updates**: Modify HTML/CSS/JS and refresh browser
3. **Testing**: Use Clarinet console for contract testing

## 🌐 Deployment

### Deploy to Stacks Testnet

1. **Configure deployment**
   ```bash
   clarinet deployments generate --testnet
   ```

2. **Update deployment plan** in `deployments/default.testnet-plan.yaml`

3. **Deploy contracts**
   ```bash
   clarinet deployments apply --testnet
   ```

4. **Update frontend** with deployed contract addresses

### Deploy Frontend

Deploy to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop to Netlify
- **GitHub Pages**: Push to `gh-pages` branch
- **IPFS**: `ipfs add -r .`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Stacks Documentation**: https://docs.stacks.co/
- **Clarity Language**: https://docs.stacks.co/clarity/
- **Clarinet**: https://github.com/hirosystems/clarinet
- **Stacks Explorer**: https://explorer.stacks.co/

## 🎯 Roadmap

- [ ] Multi-collateral support (SIP-010 tokens)
- [ ] Automated interest rate adjustment
- [ ] Loan marketplace with order book
- [ ] Credit delegation system
- [ ] Flash loan functionality
- [ ] Governance token for platform decisions
- [ ] Mobile app (iOS/Android)
- [ ] Integration with DeFi protocols

## 💡 Why BitTrust?

Traditional DeFi lending requires over-collateralization, limiting capital efficiency. BitTrust introduces **reputation-based lending** to the Stacks ecosystem, enabling:

✅ **Capital Efficiency**: Borrow more with less collateral  
✅ **Credit Building**: Establish on-chain credit history  
✅ **Fair Pricing**: Interest rates based on creditworthiness  
✅ **Bitcoin Security**: Leverages Bitcoin's proof-of-work  
✅ **Decentralized**: No KYC, no intermediaries  

## 🙏 Acknowledgments

Built with ❤️ for the Stacks ecosystem and Bitcoin DeFi.

---

**Built on Stacks. Secured by Bitcoin. Powered by Reputation.**