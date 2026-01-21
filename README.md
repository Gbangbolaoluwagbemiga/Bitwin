# 🚀 BitTrust - Production-Ready Reputation Lending on Stacks

[![Stacks](https://img.shields.io/badge/Stacks-Mainnet-5546FF?style=for-the-badge&logo=stacks&logoColor=white)](https://www.stacks.co/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bitcoin](https://img.shields.io/badge/Secured_by-Bitcoin-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white)](https://bitcoin.org/)

**BitTrust** is a production-ready decentralized peer-to-peer micro-lending platform built on Stacks that combines Bitcoin's security with innovative on-chain reputation scoring. Access flexible loans with reduced collateral based on your credit history.

## ✨ Key Features

### 🏦 Advanced Lending System
- **Flexible Collateral Ratios**: 0-200%+ based on reputation
- **Peer-to-Peer Loans**: Direct lending without intermediaries
- **Automated Interest Calculation**: Fair, transparent pricing
- **Smart Liquidation**: Automated collateral management
- **Real-time Updates**: Live loan status tracking

### 📊 Reputation System
- **Dynamic Credit Scoring**: 0-1000 scale with transparent algorithm
- **On-Chain History**: Immutable credit record
- **Reputation-Based Benefits**: Lower rates, higher limits
- **Time-Weighted Scoring**: Recent performance matters more
- **Dispute Resolution**: Fair handling of edge cases

### 🏛️ Governance
- **Community Proposals**: Anyone can propose changes
- **Token-Weighted Voting**: Democratic decision making
- **Parameter Adjustment**: Update platform settings
- **Emergency Pause**: Security mechanism for critical issues
- **Timelock Execution**: Safe deployment of changes

### 🔒 Security
- **Bitcoin-Secured**: Leverages Stacks' proof-of-transfer
- **Audited Contracts**: Thoroughly tested Clarity code
- **Emergency Controls**: Owner-controlled pause mechanism
- **No Reentrancy**: Safe STX transfer patterns
- **Input Validation**: Comprehensive parameter checks

## 🏗️ Architecture

### Smart Contracts (Clarity)

#### `bittrust-core.clar` (333 lines)
Core lending logic with:
- Loan creation and management
- Collateral escrow
- Repayment processing
- Liquidation mechanism
- User statistics

#### `reputation-system.clar` (263 lines)
Credit scoring system with:
- Score calculation (0-1000)
- Borrowing limit computation
- Interest rate recommendations
- Reputation history
- Default penalties

#### `governance.clar` (228 lines)
Platform governance with:
- Proposal creation
- Voting mechanism
- Parameter updates
- Emergency pause
- Admin functions

### Frontend (Next.js 14 + TypeScript)

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Dashboard
│   │   ├── lend/              # Lending interface
│   │   ├── borrow/            # Borrowing interface
│   │   └── reputation/        # Reputation dashboard
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Header, Footer
│   │   ├── lending/          # Loan forms, cards
│   │   └── reputation/       # Score display
│   └── lib/                   # Utilities
│       ├── hooks/            # Custom React hooks
│       ├── contracts/        # Contract ABIs
│       └── utils/            # Helper functions
└── public/                    # Static assets
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Clarinet](https://github.com/hirosystems/clarinet) v3.11.0+
- [Hiro Wallet](https://wallet.hiro.so/) or [Leather Wallet](https://leather.io/)
- Stacks account with STX for mainnet deployment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gbangbolaoluwagbemiga/Bitwin.git
   cd Bitwin
   ```

2. **Install dependencies**
   ```bash
   # Install Clarinet dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy environment template
   cp .env.example .env.local

   # Edit .env.local with your deployment keys
   # IMPORTANT: Never commit .env.local to git
   ```

4. **Verify contracts**
   ```bash
   clarinet check
   ```

5. **Run development server**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the root directory:

```env
# Network Configuration
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_STACKS_API=https://api.mainnet.hiro.so

# Contract Addresses (update after deployment)
NEXT_PUBLIC_CORE_CONTRACT=SP...
NEXT_PUBLIC_REPUTATION_CONTRACT=SP...
NEXT_PUBLIC_GOVERNANCE_CONTRACT=SP...

# Deployment Keys (KEEP SECRET!)
DEPLOYER_MNEMONIC=your twelve word mnemonic phrase here
```

### Mainnet Deployment

1. **Fund your deployer account**
   - Send STX to your deployer address
   - Ensure sufficient balance for contract deployment (~5-10 STX)

2. **Run deployment script**
   ```bash
   ./scripts/deploy-mainnet.sh
   ```

3. **Update contract addresses**
   - Copy deployed addresses from output
   - Update `.env.local` with new addresses
   - Update `frontend/src/lib/contracts/addresses.ts`

4. **Deploy frontend**
   ```bash
   cd frontend
   npm run build
   # Deploy to Vercel, Netlify, or your preferred host
   ```

## 📖 Usage Guide

### For Lenders

1. **Connect Wallet**: Click "Connect Wallet" in header
2. **Navigate to Lend**: Go to lending interface
3. **Create Loan Offer**:
   - Enter borrower address
   - Set loan amount (STX)
   - Define interest rate (%)
   - Set duration (blocks)
   - Specify minimum collateral ratio
4. **Approve Transaction**: Sign in wallet
5. **Track Loans**: Monitor in dashboard

### For Borrowers

1. **Build Reputation**: Initialize your credit score
2. **Find Loans**: Browse available offers
3. **Accept Loan**:
   - Provide required collateral
   - Accept loan terms
   - Sign transaction
4. **Repay Loan**: Make timely payments to build credit
5. **Unlock Benefits**: Higher scores = better terms

### Reputation Scoring

Your credit score (0-1000) is calculated from:

| Component | Weight | Description |
|-----------|--------|-------------|
| Repayment Rate | 40% | % of loans successfully repaid |
| Volume | 30% | Total lending/borrowing volume |
| Loan Count | 20% | Number of completed loans |
| Defaults | Penalty | -100 points per default |
| Base Score | 100 | Starting credit |

**Score Tiers:**
- **750-1000**: Premium (5-10% APR, uncollateralized loans)
- **500-750**: Standard (10-15% APR, partial collateral)
- **0-500**: Basic (15-25% APR, full collateral required)

## 🧪 Testing

### Contract Tests

```bash
# Run Clarinet tests
npm test

# Run specific test
clarinet test tests/bittrust-core_test.ts
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 🔐 Security

### Audit Status
- ✅ Internal security review completed
- ⏳ External audit pending
- ✅ Testnet deployment tested
- ⏳ Mainnet deployment pending

### Security Features
- No reentrancy vulnerabilities
- Input validation on all functions
- Emergency pause mechanism
- Owner-controlled admin functions
- Transparent on-chain logic

### Reporting Vulnerabilities

Please report security issues to: security@bittrust.io

## 📊 Contract Addresses

### Mainnet
```
Core Contract:       [To be deployed]
Reputation System:   [To be deployed]
Governance:          [To be deployed]
```

### Testnet
```
Core Contract:       ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bittrust-core
Reputation System:   ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.reputation-system
Governance:          ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.governance
```

## 🛣️ Roadmap

- [x] Core lending functionality
- [x] Reputation system
- [x] Governance mechanism
- [x] Next.js frontend
- [ ] Mainnet deployment
- [ ] External audit
- [ ] Multi-collateral support
- [ ] Mobile app
- [ ] Credit delegation
- [ ] Flash loans
- [ ] DeFi integrations

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: https://bittrust.io (coming soon)
- **Documentation**: https://docs.bittrust.io (coming soon)
- **Twitter**: [@BitTrustDeFi](https://twitter.com/BitTrustDeFi)
- **Discord**: [Join Community](https://discord.gg/bittrust)
- **Stacks Explorer**: https://explorer.stacks.co/

## 💡 Why BitTrust?

Traditional DeFi requires 150%+ collateral, limiting capital efficiency. BitTrust introduces **reputation-based lending** to Stacks, enabling:

✅ **Capital Efficiency**: Borrow more with less collateral  
✅ **Credit Building**: Establish verifiable on-chain credit  
✅ **Fair Pricing**: Rates based on creditworthiness  
✅ **Bitcoin Security**: Leverages Bitcoin's proof-of-work  
✅ **Decentralized**: No KYC, no intermediaries  
✅ **Transparent**: Open-source, auditable code  

## 🙏 Acknowledgments

- **Stacks Foundation** for blockchain infrastructure
- **Hiro** for development tools
- **Bitcoin** for security layer
- **Community** for feedback and support

---

**Built on Stacks. Secured by Bitcoin. Powered by Reputation.**

*Making DeFi lending more accessible and capital-efficient.*