# MemoryChain React Integration Guide

This guide will help you integrate your existing React wallet connection components with the MemoryChain application.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- React 18+
- @txnlab/use-wallet-react
- Tailwind CSS (optional but recommended)

### Installation

1. **Install required dependencies:**
```bash
npm install @txnlab/use-wallet-react react-toastify lucide-react
```

2. **Set up the wallet provider in your main App component:**

```jsx
// App.jsx
import React from 'react';
import { WalletProvider } from '@txnlab/use-wallet-react';
import { NetworkId, WalletId, WalletManager } from '@txnlab/use-wallet-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemoryChainApp from './MemoryChainApp';

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.EXODUS,
  ],
  defaultNetwork: NetworkId.TESTNET,
});

function App() {
  return (
    <WalletProvider manager={walletManager}>
      <MemoryChainApp />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </WalletProvider>
  );
}

export default App;
```

## 📁 File Structure

Your React components should be organized like this:

```
src/
├── components/
│   ├── ConnectWalletButton.jsx
│   ├── ConnectWalletModal.jsx
│   └── WalletProviderWrapper.jsx
├── App.jsx
├── MemoryChainApp.jsx
└── index.js
```

## 🔧 Component Integration

### 1. ConnectWalletButton Component

This is your existing component that works perfectly:

```jsx
// components/ConnectWalletButton.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@txnlab/use-wallet-react";
import ConnectWalletModal from "./ConnectWalletModal";

export function ConnectWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeAccount, wallets } = useWallet();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <>
      <Button 
        variant="default" 
        size="lg" 
        className="gap-2 px-6" 
        onClick={openModal}
      >
        <Wallet className="h-5 w-5" />
        {activeAccount ? truncateAddress(activeAccount.address) : "Connect Wallet"}
      </Button>

      <ConnectWalletModal 
        wallets={wallets} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
}
```

### 2. ConnectWalletModal Component

Your modal component is already well-implemented:

```jsx
// components/ConnectWalletModal.jsx
import { toast } from "react-toastify";

const ConnectWalletModal = ({
  wallets,
  isOpen,
  onClose,
}) => {
  const { activeAccount } = useWallet();

  if (!isOpen) return null;

  const handleWalletClick = async (wallet) => {
    try {
      if (wallet.isConnected) {
        await wallet.setActive();
        toast.success("Wallet set as active");
      } else {
        await wallet.connect();
        toast.success("Wallet connected successfully");
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallets = async () => {
    try {
      for (const wallet of wallets) {
        if (wallet.isConnected) {
          await wallet.disconnect();
        }
      }
      toast.success("Disconnected from all wallets");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to disconnect wallets");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        {/* Modal content from your existing code */}
      </div>
    </div>
  );
};
```

### 3. MemoryChainApp Component

This is the main application component that integrates everything:

```jsx
// MemoryChainApp.jsx
import React, { useState, useEffect } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { toast } from 'react-toastify';
import ConnectWalletModal from './components/ConnectWalletModal';

const MemoryChainApp = () => {
  const { activeAccount, wallets } = useWallet();
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Load memories when wallet is connected
  useEffect(() => {
    if (activeAccount) {
      loadMemories();
    }
  }, [activeAccount]);

  const loadMemories = async () => {
    try {
      // Your memory loading logic here
      const mockMemories = [
        {
          id: 1,
          title: "Family Vacation 2023",
          description: "Amazing trip to the mountains",
          type: "photo",
          date: "2023-08-15",
          encrypted: true,
          thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
          tags: ["vacation", "family"],
          owner: activeAccount.address
        },
        // Add more memories...
      ];
      
      setMemories(mockMemories);
      toast.success('Memories loaded successfully!');
    } catch (error) {
      console.error('Error loading memories:', error);
      toast.error('Failed to load memories');
    }
  };

  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="memory-chain-app">
      <nav className="app-nav">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">MC</div>
            <div className="logo-text">MemoryChain</div>
          </div>
          
          <div className="nav-links">
            <button 
              className={currentView === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={currentView === 'upload' ? 'active' : ''}
              onClick={() => setCurrentView('upload')}
            >
              Upload
            </button>
            <button 
              className={currentView === 'family' ? 'active' : ''}
              onClick={() => setCurrentView('family')}
            >
              Family
            </button>
          </div>
          
          <div className="wallet-status">
            {activeAccount ? (
              <span className="connected-wallet">
                Connected: {truncateAddress(activeAccount.address)}
              </span>
            ) : (
              <button 
                className="connect-btn"
                onClick={() => setIsWalletModalOpen(true)}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="app-main">
        {currentView === 'dashboard' && (
          <Dashboard 
            memories={memories}
            onMemoryClick={handleMemoryClick}
            activeAccount={activeAccount}
          />
        )}
        {currentView === 'upload' && <UploadSection activeAccount={activeAccount} />}
        {currentView === 'family' && <FamilySection activeAccount={activeAccount} />}
      </main>

      {/* Wallet Connection Modal */}
      <ConnectWalletModal 
        wallets={wallets}
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};

export default MemoryChainApp;
```

## 🔗 Integration with Existing HTML App

### Option 1: Full React Migration
Replace the entire application with React:

1. Create a new React app:
```bash
npx create-react-app memorychain-react
cd memorychain-react
```

2. Install dependencies:
```bash
npm install @txnlab/use-wallet-react react-toastify lucide-react
```

3. Copy your components to the React app
4. Update the build process to output to the same directory

### Option 2: Hybrid Approach
Keep both versions and let users choose:

1. Create a new page `index-react.html` with the React app
2. Add a button to switch between versions
3. Share state between versions using localStorage

### Option 3: Component Integration
Use React components within the existing HTML app:

1. Use a tool like htm or preact for lightweight React integration
2. Mount React components in specific DOM elements
3. Keep the existing HTML structure

## 📱 Mobile Responsiveness

Your existing components are already well-structured for mobile. Add these responsive classes:

```jsx
// In your components, add responsive classes
<div className="flex flex-col md:flex-row gap-4">
  {/* Content that stacks on mobile, side-by-side on desktop */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 🎨 Styling Integration

### Option 1: Tailwind CSS (Recommended)
Since you're already using Tailwind classes, integrate it fully:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Option 2: CSS Modules
Convert your existing CSS to CSS modules:

```css
/* App.module.css */
.memoryCard {
  background: white;
  border-radius: 1rem;
  /* ... other styles */
}
```

```jsx
import styles from './App.module.css';

<div className={styles.memoryCard}>
  {/* Content */}
</div>
```

## 🔄 State Management

For the memory display issue, implement proper state management:

```jsx
// In MemoryChainApp.jsx
const [memories, setMemories] = useState([]);

const addMemory = (newMemory) => {
  setMemories(prevMemories => [newMemory, ...prevMemories]);
};

const updateMemory = (id, updatedMemory) => {
  setMemories(prevMemories => 
    prevMemories.map(memory => 
      memory.id === id ? updatedMemory : memory
    )
  );
};

const deleteMemory = (id) => {
  setMemories(prevMemories => 
    prevMemories.filter(memory => memory.id !== id)
  );
};
```

## 🧪 Testing

### Unit Tests
```jsx
// ConnectWalletButton.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectWalletButton } from './ConnectWalletButton';

test('renders connect wallet button', () => {
  render(<ConnectWalletButton />);
  const buttonElement = screen.getByText(/connect wallet/i);
  expect(buttonElement).toBeInTheDocument();
});
```

### Integration Tests
```jsx
// MemoryChainApp.test.jsx
import { render, waitFor } from '@testing-library/react';
import { WalletProvider } from '@txnlab/use-wallet-react';
import MemoryChainApp from './MemoryChainApp';

test('loads memories when wallet is connected', async () => {
  const { getByText } = render(
    <WalletProvider manager={mockWalletManager}>
      <MemoryChainApp />
    </WalletProvider>
  );
  
  await waitFor(() => {
    expect(getByText('Memories loaded successfully!')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Deploy to Static Hosting
The built files can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 🔧 Troubleshooting

### Memory Display Issue
If memories aren't displaying:

1. **Check state updates:**
```jsx
// Ensure you're using functional state updates
setMemories(prev => [...prev, newMemory]);
```

2. **Verify data structure:**
```jsx
console.log('Memories:', memories);
console.log('Selected memory:', selectedMemory);
```

3. **Check rendering conditions:**
```jsx
{memories.length > 0 ? (
  <MemoryGrid memories={memories} />
) : (
  <NoMemoriesMessage />
)}
```

### Wallet Connection Issues
1. **Check provider setup:**
```jsx
// Ensure WalletProvider is at the root of your app
<WalletProvider manager={walletManager}>
  <App />
</WalletProvider>
```

2. **Verify network configuration:**
```jsx
const walletManager = new WalletManager({
  wallets: [WalletId.PERA],
  defaultNetwork: NetworkId.TESTNET, // or NetworkId.MAINNET
});
```

3. **Handle connection errors:**
```jsx
try {
  await wallet.connect();
  toast.success("Connected!");
} catch (error) {
  console.error("Connection failed:", error);
  toast.error("Connection failed");
}
```

## 📚 Additional Resources

- [@txnlab/use-wallet-react Documentation](https://github.com/TxnLab/use-wallet-react)
- [Pera Wallet Connect Documentation](https://docs.perawallet.app/)
- [Algorand Developer Portal](https://developer.algorand.org/)
- [React Documentation](https://reactjs.org/)

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the React integration!

## 📄 License

This integration guide is part of the MemoryChain project and follows the same license terms.