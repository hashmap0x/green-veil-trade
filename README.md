# Green Veil Trade

A privacy-focused carbon credit trading platform built with FHE (Fully Homomorphic Encryption) technology. Trade carbon credits while maintaining complete privacy through encrypted pricing and anonymous settlements.

## Features

- **Encrypted Pricing**: All trading prices are encrypted using FHE technology
- **Anonymous Trading**: Trade without revealing your identity or trading patterns
- **Real-time Market Data**: Live carbon credit market insights
- **Secure Wallet Integration**: Connect with popular Web3 wallets
- **Sustainable Impact**: Contribute to global carbon reduction efforts

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hashmap0x/green-veil-trade.git
cd green-veil-trade
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add the following environment variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contracts

The platform uses FHE-enabled smart contracts for:
- Encrypted carbon credit trading
- Anonymous settlement processing
- Privacy-preserving market data
- Secure reputation management

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE features
- [ ] Mobile app
- [ ] API for third-party integrations
- [ ] Carbon credit verification system