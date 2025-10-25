# MemoryChain - Decentralized Digital Legacy Vault

A sophisticated full-stack decentralized application for securing digital memories using Algorand blockchain, IPFS storage, and end-to-end encryption.

## 🌟 Features

### Core Functionality
- **🔐 Military-Grade Encryption**: AES-256 encryption with private key management
- **⛓️ Blockchain Security**: Built on Algorand's carbon-negative blockchain
- **🗄️ Decentralized Storage**: IPFS integration for permanent memory storage
- **👨‍👩‍👧‍👦 Family Collaboration**: Share memories with designated family members
- **🌳 Family Tree Visualization**: Interactive D3.js-powered family tree
- **📱 Responsive Design**: Optimized for all devices

### Advanced Features
- **⚰️ Legacy Mode**: Automatic inheritance transfer with dead man's switch
- **🎨 NFT Minting**: Convert memories to verifiable NFT certificates
- **⏰ Time-Locked Memories**: Schedule memory releases for special dates
- **📍 Geo-Locked Access**: Restrict memories to specific locations
- **🤝 Collaborative Storytelling**: Multiple family members can co-author memories
- **📊 Activity Tracking**: Monitor access and collaboration history

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **Tailwind CSS**: Utility-first styling with custom design system
- **Vanilla JavaScript**: Core application logic without framework overhead
- **WebCrypto API**: Client-side cryptographic operations

### Blockchain Integration
- **Algorand**: High-performance, carbon-negative blockchain
- **@perawallet/connect**: Pera Wallet integration
- **algosdk**: Algorand JavaScript SDK
- **PyTeal**: Smart contract development (ready for deployment)

### Libraries & Effects
- **Anime.js**: Smooth micro-interactions and state transitions
- **ECharts.js**: Data visualization and family tree
- **D3.js**: Interactive family tree visualization
- **Typed.js**: Typewriter effects for hero text
- **Splitting.js**: Advanced text animations
- **Pixi.js**: High-performance visual effects

## 📁 Project Structure

```
MemoryChain/
├── index.html              # Main dashboard with wallet connection
├── upload.html             # Memory upload with encryption workflow
├── family.html             # Family tree and collaboration
├── legacy.html             # Legacy mode configuration
├── nft.html                # NFT minting interface
├── main.js                 # Core application logic
├── resources/              # Static assets
│   ├── hero-vault.jpg      # Hero image for digital vault
│   ├── hero-family.jpg     # Hero image for family legacy
│   └── hero-blockchain.jpg # Hero image for blockchain security
├── interaction.md          # Detailed interaction specifications
├── design.md               # Design philosophy and visual guidelines
├── outline.md              # Project structure and architecture
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with WebCrypto API support
- Algorand wallet (Pera Wallet or MyAlgo recommended)
- Node.js 14+ for local development (optional)

### Installation

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone [repository-url]
   cd memorychain
   ```

2. **Serve the application locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` to view the application.

### Configuration

The application is pre-configured for demonstration purposes. For production deployment:

1. **Update Algorand network settings** in `main.js`
2. **Configure IPFS endpoints** for file storage
3. **Set up smart contracts** using PyTeal (contracts directory ready)
4. **Configure wallet connection** settings

## 💡 Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the navigation
- Choose between Pera Wallet or MyAlgo
- Authorize the connection to access your vault

### 2. Upload Memories
- Navigate to the Upload page
- Select files using drag-and-drop or file browser
- Add metadata (title, description, tags)
- Configure family access permissions
- Set time/geo restrictions if desired
- Click "Encrypt & Store" to upload to IPFS and record on blockchain

### 3. Manage Family Access
- Visit the Family page to view the interactive family tree
- Add new family members with their wallet addresses
- Configure memory sharing permissions
- Collaborate on memory creation and editing

### 4. Configure Legacy Mode
- Go to the Legacy page to set up inheritance
- Configure inactivity timer (1-24 months)
- Designate heirs with inheritance percentages
- Add emergency contacts for verification
- Test the legacy process

### 5. Mint NFTs
- Select memories from the NFT page
- Customize NFT metadata and traits
- Set marketplace listing options
- Mint the NFT on Algorand blockchain
- View your NFT collection

## 🔒 Security Features

### Encryption
- **AES-256-GCM**: Military-grade symmetric encryption
- **RSA-2048**: Asymmetric key exchange
- **Client-side only**: All encryption happens in the browser
- **Private key management**: Wallet-based key derivation

### Access Control
- **Role-based permissions**: Different access levels for family members
- **Time restrictions**: Memories can be time-locked
- **Geographic restrictions**: Location-based access control
- **Audit trail**: Complete access logging

### Blockchain Security
- **Immutable storage**: Memories permanently recorded on Algorand
- **Smart contracts**: Automated access control and inheritance
- **Multi-signature**: Important operations require multiple approvals
- **Transaction verification**: All blockchain operations are verified

## 🎨 Design Philosophy

### Visual Language
- **Trust Through Transparency**: Clear visual hierarchy and honest interactions
- **Digital Permanence**: Stable, enduring design that feels timeless
- **Human Touch**: Warm gold accents balance technical precision
- **Minimalist Sophistication**: Clean lines and purposeful elements

### Color Palette
- **Primary**: Deep Teal (#1a4d4d) - Trust and security
- **Secondary**: Warm Gold (#d4af37) - Legacy and value
- **Accent**: Soft Ivory (#f8f6f0) - Purity and clarity
- **Text**: Charcoal (#2c2c2c) - Readability and sophistication

### Typography
- **Display**: Inter font family for modern, clean appearance
- **Body**: Optimized for readability across all devices
- **Monospace**: For technical elements like addresses and IDs

## 🏗️ Architecture

### Frontend Architecture
```
MemoryChain/
├── Core Components
│   ├── Wallet Connection
│   ├── Memory Management
│   ├── Encryption Engine
│   ├── IPFS Integration
│   └── Blockchain Interface
├── UI Components
│   ├── Navigation
│   ├── Memory Gallery
│   ├── Family Tree
│   ├── Upload Form
│   └── NFT Creator
└── Utilities
    ├── Crypto Operations
    ├── API Clients
    └── State Management
```

### Data Flow
1. **User Action** → Frontend Validation
2. **Encryption** → Client-side AES-256
3. **IPFS Upload** → Decentralized storage
4. **Blockchain Record** → Algorand transaction
5. **Confirmation** → UI update and notification

## 🧪 Testing

### Manual Testing
1. **Wallet Connection**: Test Pera and MyAlgo wallet connections
2. **Memory Upload**: Verify encryption and IPFS storage
3. **Family Management**: Test adding members and permissions
4. **Legacy Mode**: Simulate inheritance process
5. **NFT Minting**: Create and verify NFT certificates

### Automated Testing
```javascript
// Example test cases
- Wallet connection and disconnection
- Memory encryption and decryption
- IPFS upload and retrieval
- Family member management
- NFT minting workflow
- Legacy mode activation
```

## 🚀 Deployment

### Static Hosting
The application can be deployed to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting

### Production Considerations
1. **Environment Variables**: Configure API endpoints and keys
2. **SSL Certificate**: Ensure HTTPS for secure wallet connections
3. **CDN**: Use CDN for faster global access
4. **Monitoring**: Set up error tracking and performance monitoring

## 🔮 Future Enhancements

### Planned Features
- **AI-Powered Restoration**: Automatic media enhancement
- **Voice Narration**: AI-generated memory descriptions
- **Advanced Analytics**: Memory engagement insights
- **Mobile App**: Native iOS and Android applications
- **Social Features**: Community memory sharing
- **Integration APIs**: Connect with other platforms

### Technical Improvements
- **Layer 2 Scaling**: Reduce transaction costs
- **Advanced Encryption**: Post-quantum cryptography
- **Cross-chain Support**: Multi-blockchain compatibility
- **Decentralized Identity**: Self-sovereign identity integration

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**
3. **Commit your changes**
4. **Push to the branch**
5. **Create a Pull Request**

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Algorand Foundation**: For the amazing blockchain platform
- **Pera Wallet Team**: For excellent wallet integration
- **IPFS Community**: For decentralized storage solutions
- **Open Source Contributors**: For the libraries and tools used

## 📞 Support

For support, please contact:
- **Email**: support@memorychain.app
- **Discord**: [MemoryChain Community](https://discord.gg/memorychain)
- **Documentation**: [docs.memorychain.app](https://docs.memorychain.app)

## 🔗 Links

- **Website**: [memorychain.app](https://memorychain.app)
- **Documentation**: [docs.memorychain.app](https://docs.memorychain.app)
- **GitHub**: [github.com/memorychain/memorychain](https://github.com/memorychain/memorychain)
- **Twitter**: [@MemoryChainApp](https://twitter.com/MemoryChainApp)

---

**MemoryChain** - Securing digital legacies for generations to come. Built with ❤️ on Algorand blockchain.