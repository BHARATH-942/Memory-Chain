import React, { useState, useEffect } from 'react';
import { WalletProvider, useWallet } from '@txnlab/use-wallet-react';
import { NetworkId, WalletId, WalletManager } from '@txnlab/use-wallet-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Wallet Manager Configuration
const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.EXODUS,
  ],
  defaultNetwork: NetworkId.TESTNET,
});

// Main App Component
function App() {
  return (
    <WalletProvider manager={walletManager}>
      <div className="App">
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
      </div>
    </WalletProvider>
  );
}

// Main MemoryChain Application
function MemoryChainApp() {
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
      // Simulate loading memories from blockchain/IPFS
      const mockMemories = [
        {
          id: 1,
          title: "Family Vacation 2023",
          description: "Amazing trip to the mountains with the whole family",
          type: "photo",
          date: "2023-08-15",
          encrypted: true,
          thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
          tags: ["vacation", "family", "mountains"],
          owner: activeAccount.address
        },
        {
          id: 2,
          title: "Graduation Day",
          description: "Sister's college graduation ceremony",
          type: "photo",
          date: "2024-05-20",
          encrypted: true,
          thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
          tags: ["graduation", "achievement", "family"],
          owner: activeAccount.address
        },
        {
          id: 3,
          title: "Christmas Morning",
          description: "Opening presents on Christmas morning",
          type: "photo",
          date: "2023-12-25",
          encrypted: true,
          thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
          tags: ["christmas", "family", "celebration"],
          owner: activeAccount.address
        }
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

  const closeMemoryModal = () => {
    setSelectedMemory(null);
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const renderDashboard = () => (
    <div className="dashboard">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>MemoryChain</h1>
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
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Your Digital Legacy, Secured Forever</h2>
          <p>Preserve your precious memories with blockchain-powered encryption and share them with future generations.</p>
          
          {activeAccount && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{memories.length}</div>
                <div className="stat-label">Memories</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Family Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">Live</div>
                <div className="stat-label">Blockchain</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Memory Gallery */}
      {activeAccount && (
        <section className="memory-gallery">
          <h3>Your Memory Vault</h3>
          <div className="memory-grid">
            {memories.map((memory) => (
              <div 
                key={memory.id} 
                className="memory-card"
                onClick={() => handleMemoryClick(memory)}
              >
                <img src={memory.thumbnail} alt={memory.title} />
                <div className="memory-info">
                  <h4>{memory.title}</h4>
                  <p>{memory.description}</p>
                  <div className="memory-meta">
                    <span>{new Date(memory.date).toLocaleDateString()}</span>
                    {memory.encrypted && <span className="encrypted-badge">🔒</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Wallet Connected */}
      {!activeAccount && (
        <section className="no-wallet">
          <div className="no-wallet-content">
            <h3>Connect Your Wallet to Get Started</h3>
            <p>Secure your digital legacy with Algorand blockchain technology.</p>
            <button 
              className="cta-button"
              onClick={() => setIsWalletModalOpen(true)}
            >
              Connect Pera Wallet
            </button>
          </div>
        </section>
      )}

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <MemoryDetailModal 
          memory={selectedMemory} 
          onClose={closeMemoryModal} 
          activeAccount={activeAccount}
        />
      )}

      {/* Wallet Connection Modal */}
      <ConnectWalletModal 
        wallets={wallets}
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );

  return (
    <div className="memory-chain-app">
      <nav className="app-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">MC</span>
            <span className="logo-text">MemoryChain</span>
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
        </div>
      </nav>

      <main className="app-main">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'upload' && <UploadSection activeAccount={activeAccount} />}
        {currentView === 'family' && <FamilySection activeAccount={activeAccount} />}
      </main>
    </div>
  );
}

// Connect Wallet Modal Component
function ConnectWalletModal({ wallets, isOpen, onClose }) {
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Connect to a wallet</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="wallet-list">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => handleWalletClick(wallet)}
              className={`wallet-item ${wallet.isConnected ? 'connected' : ''} ${wallet.isActive ? 'active' : ''}`}
            >
              <span className="wallet-name">
                {wallet.metadata.name}
                {wallet.activeAccount && ` [${wallet.activeAccount.address.slice(0, 3)}...${wallet.activeAccount.address.slice(-3)}]`}
                {wallet.isActive && ` (active)`}
              </span>
              <img
                src={wallet.metadata.icon || "/wallet-icon.svg"}
                alt={`${wallet.metadata.name} Icon`}
                className="wallet-icon"
              />
            </div>
          ))}
        </div>

        {activeAccount && (
          <div className="disconnect-section">
            <div onClick={disconnectWallets} className="disconnect-button">
              <span>Disconnect {activeAccount.address.slice(0, 3)}...{activeAccount.address.slice(-3)}</span>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <span>New to Algorand? </span>
          <a href="https://algorand.com/wallets" target="_blank" rel="noopener noreferrer">
            Learn about wallets
          </a>
        </div>
      </div>
    </div>
  );
}

// Memory Detail Modal Component
function MemoryDetailModal({ memory, onClose, activeAccount }) {
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecrypt = async () => {
    setIsDecrypting(true);
    try {
      // Simulate decryption process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Memory decrypted successfully!');
      // Here you would actually decrypt and display the memory
    } catch (error) {
      toast.error('Failed to decrypt memory');
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content memory-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{memory.title}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="memory-content">
          <img src={memory.thumbnail} alt={memory.title} className="memory-image" />
          
          <div className="memory-details">
            <p className="memory-description">{memory.description}</p>
            <div className="memory-meta">
              <span>Date: {new Date(memory.date).toLocaleDateString()}</span>
              <span>Type: {memory.type.toUpperCase()}</span>
              {memory.encrypted && <span className="encrypted">🔒 Encrypted</span>}
            </div>
            
            <div className="memory-tags">
              {memory.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="memory-actions">
            <button 
              className="decrypt-button"
              onClick={handleDecrypt}
              disabled={isDecrypting}
            >
              {isDecrypting ? 'Decrypting...' : 'Decrypt Memory'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Upload Section Component
function UploadSection({ activeAccount }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (files) => {
    setSelectedFiles(Array.from(files));
  };

  const handleUpload = async () => {
    if (!activeAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload process
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      toast.success('Memory uploaded successfully!');
      setSelectedFiles([]);
      setUploadProgress(0);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Memory</h2>
      
      <div className="upload-area">
        <div className="file-drop-zone">
          <input 
            type="file" 
            multiple 
            onChange={(e) => handleFileSelect(e.target.files)}
            className="file-input"
          />
          <div className="drop-zone-content">
            <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h3>Drop files here or click to browse</h3>
            <p>Support for photos, videos, documents, and audio files up to 100MB</p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <h4>Selected Files:</h4>
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ))}
          </div>
        )}

        {isUploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <span>{uploadProgress}%</span>
          </div>
        )}

        <button 
          className="upload-button"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Memory'}
        </button>
      </div>
    </div>
  );
}

// Family Section Component
function FamilySection({ activeAccount }) {
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'John Smith', relationship: 'Father', avatar: '👨', memories: 12 },
    { id: 2, name: 'Sarah Smith', relationship: 'Mother', avatar: '👩', memories: 8 },
    { id: 3, name: 'Emma Smith', relationship: 'Sister', avatar: '👧', memories: 5 },
  ]);

  return (
    <div className="family-section">
      <h2>Family Tree</h2>
      
      <div className="family-grid">
        {familyMembers.map(member => (
          <div key={member.id} className="family-member-card">
            <div className="member-avatar">{member.avatar}</div>
            <div className="member-info">
              <h4>{member.name}</h4>
              <p>{member.relationship}</p>
              <span>{member.memories} memories shared</span>
            </div>
            <button className="share-button">Share Memory</button>
          </div>
        ))}
      </div>

      <div className="family-actions">
        <button className="add-member-button">Add Family Member</button>
      </div>
    </div>
  );
}

export default App;