# MemoryChain - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html                 # Main dashboard with wallet connection and memory gallery
├── upload.html               # Memory upload form with encryption workflow
├── family.html               # Family tree visualization and management
├── legacy.html               # Legacy mode configuration and inheritance setup
├── nft.html                  # NFT minting interface and collection management
├── main.js                   # Core application logic and blockchain integration
├── resources/                # Static assets and media files
│   ├── hero-vault.jpg        # Hero image for digital vault concept
│   ├── hero-family.jpg       # Hero image for family legacy theme
│   ├── hero-blockchain.jpg   # Hero image for blockchain security theme
│   ├── memory-icons/         # Icons for different memory types
│   ├── family-avatars/       # Generated family member avatars
│   └── ui-elements/          # Custom UI graphics and backgrounds
└── README.md                 # Project documentation and setup instructions
```

## Page Breakdown

### 1. index.html - Main Dashboard
**Purpose**: Central hub for the MemoryChain application
**Key Sections**:
- Navigation bar with wallet connection status
- Hero section with animated background and typewriter text
- Memory gallery with grid/timeline toggle
- Quick stats: total memories, family members, legacy status
- Recent activity feed
- Blockchain connection status indicator

**Interactive Components**:
- Wallet connection modal (Pera/MyAlgo integration)
- Memory gallery with filtering and search
- Memory preview modal with decryption interface
- Quick action buttons (upload, add family, configure legacy)

### 2. upload.html - Memory Upload & Encryption
**Purpose**: Secure memory upload with client-side encryption
**Key Sections**:
- Upload zone with drag-and-drop functionality
- Encryption progress visualization
- Memory metadata form (title, description, tags)
- Family access control matrix
- Time/geo restriction settings
- IPFS upload status and CID display

**Interactive Components**:
- Multi-file upload with progress tracking
- AES-256 encryption with visual feedback
- Family member permission toggles
- Date/location pickers for restrictions
- Transaction signing and confirmation

### 3. family.html - Family Tree & Collaboration
**Purpose**: Family relationship management and collaborative features
**Key Sections**:
- Interactive family tree visualization (D3.js)
- Family member management panel
- Shared memories overview
- Collaboration activity feed
- Invitation system for new members

**Interactive Components**:
- Clickable family tree nodes with member details
- Add/edit family member modals
- Memory sharing permission controls
- Real-time collaboration interface
- Family member search and filtering

### 4. legacy.html - Legacy Mode & Inheritance
**Purpose**: Configure digital inheritance and dead man's switch
**Key Sections**:
- Legacy mode status and countdown
- Heir designation interface
- Inactivity timer configuration
- Emergency contact management
- Legacy preview and testing

**Interactive Components**:
- Heir wallet address input with validation
- Inactivity period slider (months/years)
- Legacy simulation and testing tools
- Emergency activation procedures
- Transfer status monitoring

### 5. nft.html - NFT Minting & Collection
**Purpose**: Convert memories to NFTs for authenticity proof
**Key Sections**:
- NFT creator interface
- Memory selection gallery
- Metadata editing form
- Minting progress and status
- NFT collection viewer

**Interactive Components**:
- Memory selection with preview
- NFT metadata customization
- ASA creation with Algorand integration
- Marketplace connectivity options
- Collection management tools

## Core JavaScript Modules (main.js)

### 1. Blockchain Integration
- Algorand wallet connection (Pera/MyAlgo)
- Smart contract interaction (PyTeal compiled contracts)
- Transaction signing and submission
- Network status monitoring

### 2. Encryption Engine
- Client-side AES-256 encryption/decryption
- RSA key pair generation and management
- Secure key storage and retrieval
- WebCrypto API integration

### 3. IPFS Integration
- File upload to IPFS with progress tracking
- CID management and retrieval
- Metadata storage and linking
- Content addressing verification

### 4. Memory Management
- Memory CRUD operations
- Search and filtering functionality
- Access control enforcement
- Version history tracking

### 5. Family Management
- Family member relationship mapping
- Permission matrix management
- Collaboration coordination
- Activity logging

### 6. Legacy System
- Inactivity monitoring and detection
- Heir designation and management
- Automatic access transfer
- Emergency procedures

### 7. NFT Operations
- ASA creation and management
- Metadata preparation and linking
- Minting workflow coordination
- Collection tracking

### 8. UI Controllers
- Page navigation and routing
- Modal management
- Form validation and submission
- Real-time updates and notifications

## Technical Architecture

### Frontend Stack
- **HTML5**: Semantic markup with accessibility features
- **Tailwind CSS**: Utility-first styling with custom design system
- **Vanilla JavaScript**: Core application logic without framework overhead
- **WebCrypto API**: Client-side cryptographic operations
- **Fetch API**: HTTP requests for IPFS and backend services

### Blockchain Integration
- **@perawallet/connect**: Pera Wallet integration
- **algosdk**: Algorand JavaScript SDK
- **Smart Contracts**: PyTeal compiled TEAL programs
- **ASA Standards**: ARC-3 and ARC-69 compliance

### Storage & Infrastructure
- **IPFS**: Decentralized file storage
- **Algorand**: Blockchain for metadata and permissions
- **Local Storage**: Encrypted key caching
- **Service Worker**: Offline functionality

### Security Features
- **End-to-End Encryption**: AES-256 with RSA key exchange
- **Client-Side Operations**: No server-side decryption
- **Private Key Management**: Wallet-based key derivation
- **Access Control**: Role-based permission system

## Development Phases

### Phase 1: Core Infrastructure
1. Wallet connection and authentication
2. Basic memory upload and encryption
3. IPFS integration and CID storage
4. Simple memory gallery display

### Phase 2: Family Features
1. Family tree visualization
2. Member invitation and management
3. Memory sharing and access control
4. Collaborative memory creation

### Phase 3: Advanced Features
1. Legacy mode and inheritance
2. NFT minting and management
3. Time/geo-locked memories
4. Advanced search and filtering

### Phase 4: Polish & Optimization
1. Performance optimization
2. Mobile responsiveness
3. Accessibility improvements
4. Security auditing

This structure ensures we can deliver a functional MVP while maintaining the flexibility to add advanced features incrementally.