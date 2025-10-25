// MemoryChain - Main Application Logic
class MemoryChain {
    constructor() {
        this.isConnected = false;
        this.currentWallet = null;
        this.walletAddress = null;
        this.memories = [];
        this.familyMembers = [];
        this.currentView = 'grid';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createParticleBackground();
        this.initializeHeroText();
        this.loadMockData();
        this.setupScrollAnimations();
        
        // Initialize typed.js for hero text
        setTimeout(() => {
            new Typed('#heroText', {
                strings: ['Your Digital Legacy', 'Secure Forever', 'For Generations'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: false
            });
        }, 1000);
    }
    
    setupEventListeners() {
        // Wallet connection
        document.getElementById('connectWallet').addEventListener('click', () => this.openWalletModal());
        document.getElementById('closeWalletModal').addEventListener('click', () => this.closeWalletModal());
        document.getElementById('peraWallet').addEventListener('click', () => this.connectPeraWallet());
        document.getElementById('myAlgoWallet').addEventListener('click', () => this.connectMyAlgoWallet());
        
        // View toggle
        document.getElementById('gridViewBtn').addEventListener('click', () => this.switchToGridView());
        document.getElementById('timelineViewBtn').addEventListener('click', () => this.switchToTimelineView());
        
        // Search and filters
        document.getElementById('searchInput').addEventListener('input', (e) => this.searchMemories(e.target.value));
        document.getElementById('familyFilter').addEventListener('change', (e) => this.filterByFamily(e.target.value));
        document.getElementById('typeFilter').addEventListener('change', (e) => this.filterByType(e.target.value));
        
        // Memory modal
        document.getElementById('closeMemoryModal').addEventListener('click', () => this.closeMemoryModal());
        document.getElementById('decryptBtn').addEventListener('click', () => this.decryptMemory());
        
        // Click outside modal to close
        document.getElementById('walletModal').addEventListener('click', (e) => {
            if (e.target.id === 'walletModal') this.closeWalletModal();
        });
        
        document.getElementById('memoryModal').addEventListener('click', (e) => {
            if (e.target.id === 'memoryModal') this.closeMemoryModal();
        });
    }
    
    createParticleBackground() {
        const container = document.getElementById('particleContainer');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(particle);
        }
    }
    
    initializeHeroText() {
        // Initialize with typing effect
        setTimeout(() => {
            const heroText = document.getElementById('heroText');
            heroText.style.opacity = '1';
        }, 500);
    }
    
    setupScrollAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.stats-card, .memory-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    loadMockData() {
        // Mock memories data
        this.memories = [
            {
                id: 1,
                title: "Family Vacation 2023",
                description: "Amazing trip to the mountains with the whole family",
                type: "photo",
                date: "2023-08-15",
                familyMember: "father",
                encrypted: true,
                thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
                tags: ["vacation", "family", "mountains"]
            },
            {
                id: 2,
                title: "Grandma's Birthday Speech",
                description: "Heartwarming speech from grandma's 80th birthday celebration",
                type: "audio",
                date: "2023-12-03",
                familyMember: "mother",
                encrypted: true,
                thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop",
                tags: ["birthday", "speech", "celebration"]
            },
            {
                id: 3,
                title: "Graduation Day",
                description: "Sister's college graduation ceremony",
                type: "video",
                date: "2024-05-20",
                familyMember: "sister",
                encrypted: true,
                thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
                tags: ["graduation", "achievement", "family"]
            },
            {
                id: 4,
                title: "Family Recipe Collection",
                description: "Digital collection of family recipes passed down through generations",
                type: "document",
                date: "2024-01-10",
                familyMember: "mother",
                encrypted: true,
                thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
                tags: ["recipes", "heritage", "cooking"]
            },
            {
                id: 5,
                title: "Wedding Anniversary",
                description: "Parents' 30th wedding anniversary celebration",
                type: "photo",
                date: "2023-06-12",
                familyMember: "father",
                encrypted: true,
                thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop",
                tags: ["anniversary", "wedding", "celebration"]
            },
            {
                id: 6,
                title: "Baby's First Steps",
                description: "Little brother's first steps captured on video",
                type: "video",
                date: "2024-03-08",
                familyMember: "brother",
                encrypted: true,
                thumbnail: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=200&fit=crop",
                tags: ["baby", "milestones", "family"]
            }
        ];
        
        // Mock family members
        this.familyMembers = [
            { id: 'father', name: 'John Smith', relationship: 'Father' },
            { id: 'mother', name: 'Sarah Smith', relationship: 'Mother' },
            { id: 'sister', name: 'Emma Smith', relationship: 'Sister' },
            { id: 'brother', name: 'Michael Smith', relationship: 'Brother' }
        ];
        
        this.renderMemories();
    }
    
    openWalletModal() {
        document.getElementById('walletModal').classList.remove('hidden');
        anime({
            targets: '#walletModal > div',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
    }
    
    closeWalletModal() {
        anime({
            targets: '#walletModal > div',
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInCubic',
            complete: () => {
                document.getElementById('walletModal').classList.add('hidden');
            }
        });
    }
    
    async connectPeraWallet() {
        try {
            // Simulate wallet connection
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isConnected = true;
            this.currentWallet = 'Pera Wallet';
            this.walletAddress = '7F3X2Y9A8B4C6D1E5F8G2H3J4K6L9M0N';
            
            this.updateWalletStatus();
            this.closeWalletModal();
            
            this.showNotification('Wallet connected successfully!', 'success');
        } catch (error) {
            this.showNotification('Failed to connect wallet', 'error');
        }
    }
    
    async connectMyAlgoWallet() {
        try {
            // Simulate wallet connection
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isConnected = true;
            this.currentWallet = 'MyAlgo';
            this.walletAddress = '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T';
            
            this.updateWalletStatus();
            this.closeWalletModal();
            
            this.showNotification('Wallet connected successfully!', 'success');
        } catch (error) {
            this.showNotification('Failed to connect wallet', 'error');
        }
    }
    
    updateWalletStatus() {
        const connectBtn = document.getElementById('connectWallet');
        const walletStatus = document.getElementById('walletStatus');
        const walletAddress = document.getElementById('walletAddress');
        
        if (this.isConnected) {
            connectBtn.textContent = 'Connected';
            connectBtn.disabled = true;
            connectBtn.classList.add('opacity-50');
            
            walletStatus.classList.remove('hidden');
            walletAddress.textContent = this.walletAddress.substring(0, 8) + '...' + this.walletAddress.substring(-4);
        }
    }
    
    switchToGridView() {
        this.currentView = 'grid';
        document.getElementById('gridViewBtn').classList.add('bg-teal-700', 'text-white');
        document.getElementById('gridViewBtn').classList.remove('text-gray-600');
        document.getElementById('timelineViewBtn').classList.remove('bg-teal-700', 'text-white');
        document.getElementById('timelineViewBtn').classList.add('text-gray-600');
        
        document.getElementById('gridView').classList.remove('hidden');
        document.getElementById('timelineView').classList.remove('active');
        
        this.renderMemories();
    }
    
    switchToTimelineView() {
        this.currentView = 'timeline';
        document.getElementById('timelineViewBtn').classList.add('bg-teal-700', 'text-white');
        document.getElementById('timelineViewBtn').classList.remove('text-gray-600');
        document.getElementById('gridViewBtn').classList.remove('bg-teal-700', 'text-white');
        document.getElementById('gridViewBtn').classList.add('text-gray-600');
        
        document.getElementById('gridView').classList.add('hidden');
        document.getElementById('timelineView').classList.add('active');
        
        this.renderTimeline();
    }
    
    renderMemories() {
        const container = document.getElementById('gridView');
        container.innerHTML = '';
        
        this.memories.forEach((memory, index) => {
            const memoryCard = this.createMemoryCard(memory, index);
            container.appendChild(memoryCard);
        });
        
        // Animate cards
        anime({
            targets: '.memory-card',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutCubic'
        });
    }
    
    createMemoryCard(memory, index) {
        const card = document.createElement('div');
        card.className = 'memory-card rounded-xl overflow-hidden shadow-lg cursor-pointer';
        card.style.opacity = '0';
        
        const familyMember = this.familyMembers.find(f => f.id === memory.familyMember);
        
        card.innerHTML = `
            <div class="relative">
                <img src="${memory.thumbnail}" alt="${memory.title}" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2">
                    <span class="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        ${memory.type.toUpperCase()}
                    </span>
                </div>
                ${memory.encrypted ? `
                    <div class="absolute top-2 left-2">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                ` : ''}
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2">${memory.title}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">${memory.description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>${new Date(memory.date).toLocaleDateString()}</span>
                    <span>${familyMember ? familyMember.name : 'Unknown'}</span>
                </div>
                <div class="mt-2 flex flex-wrap gap-1">
                    ${memory.tags.map(tag => `
                        <span class="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">${tag}</span>
                    `).join('')}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => this.openMemoryModal(memory));
        
        return card;
    }
    
    renderTimeline() {
        const container = document.getElementById('timelineContainer');
        container.innerHTML = '';
        
        // Sort memories by date
        const sortedMemories = [...this.memories].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedMemories.forEach((memory, index) => {
            const timelineItem = this.createTimelineItem(memory, index);
            container.appendChild(timelineItem);
        });
        
        // Animate timeline items
        anime({
            targets: '.timeline-item',
            opacity: [0, 1],
            translateX: function(el, i) {
                return i % 2 === 0 ? [-50, 0] : [50, 0];
            },
            delay: anime.stagger(200),
            duration: 600,
            easing: 'easeOutCubic'
        });
    }
    
    createTimelineItem(memory, index) {
        const item = document.createElement('div');
        item.className = 'timeline-item relative flex items-center';
        item.style.opacity = '0';
        
        const isLeft = index % 2 === 0;
        const familyMember = this.familyMembers.find(f => f.id === memory.familyMember);
        
        item.innerHTML = `
            <div class="flex-1 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}">
                <div class="memory-card rounded-lg p-4 inline-block cursor-pointer hover:shadow-lg transition-all">
                    <div class="flex items-center space-x-3 mb-2">
                        <img src="${memory.thumbnail}" alt="${memory.title}" class="w-12 h-12 object-cover rounded-lg">
                        <div>
                            <h4 class="font-semibold text-gray-900">${memory.title}</h4>
                            <p class="text-sm text-gray-500">${new Date(memory.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm mb-2">${memory.description}</p>
                    <div class="flex items-center justify-${isLeft ? 'end' : 'start'} space-x-2 text-xs text-gray-500">
                        <span>${memory.type.toUpperCase()}</span>
                        <span>•</span>
                        <span>${familyMember ? familyMember.name : 'Unknown'}</span>
                        ${memory.encrypted ? '<span>🔒</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-700 rounded-full border-4 border-white shadow-lg z-10"></div>
            <div class="flex-1 ${isLeft ? 'pl-8' : 'pr-8'}"></div>
        `;
        
        item.querySelector('.memory-card').addEventListener('click', () => this.openMemoryModal(memory));
        
        return item;
    }
    
    openMemoryModal(memory) {
        document.getElementById('memoryTitle').textContent = memory.title;
        document.getElementById('memoryDate').textContent = new Date(memory.date).toLocaleDateString();
        document.getElementById('memoryType').textContent = memory.type.toUpperCase();
        
        const content = document.getElementById('memoryContent');
        content.innerHTML = `
            <div class="text-center py-12">
                <div class="mb-4">
                    <svg class="w-16 h-16 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Encrypted Memory</h4>
                <p class="text-gray-600 mb-4">This memory is securely encrypted. Click below to decrypt and view.</p>
                <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-sm text-gray-500 mb-2">Memory Details:</p>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li><strong>Type:</strong> ${memory.type.toUpperCase()}</li>
                        <li><strong>Size:</strong> ${Math.floor(Math.random() * 50 + 10)} MB</li>
                        <li><strong>Encryption:</strong> AES-256</li>
                        <li><strong>IPFS CID:</strong> ${this.generateMockCID()}</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.getElementById('memoryModal').classList.remove('hidden');
        
        anime({
            targets: '#memoryModal > div',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
    }
    
    closeMemoryModal() {
        anime({
            targets: '#memoryModal > div',
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInCubic',
            complete: () => {
                document.getElementById('memoryModal').classList.add('hidden');
            }
        });
    }
    
    async decryptMemory() {
        const decryptBtn = document.getElementById('decryptBtn');
        decryptBtn.textContent = 'Decrypting...';
        decryptBtn.disabled = true;
        
        // Simulate decryption process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        this.showNotification('Memory decrypted successfully!', 'success');
        
        // Update modal content to show decrypted memory
        document.getElementById('memoryContent').innerHTML = `
            <div class="text-center py-12">
                <div class="mb-4">
                    <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Memory Unlocked</h4>
                <p class="text-gray-600">Your memory has been successfully decrypted and is ready to view.</p>
            </div>
        `;
        
        decryptBtn.textContent = 'View Memory';
        decryptBtn.disabled = false;
        decryptBtn.onclick = () => this.viewDecryptedMemory();
    }
    
    viewDecryptedMemory() {
        this.showNotification('Opening memory viewer...', 'info');
        // Here you would implement the actual memory viewing logic
    }
    
    searchMemories(query) {
        const filteredMemories = this.memories.filter(memory => 
            memory.title.toLowerCase().includes(query.toLowerCase()) ||
            memory.description.toLowerCase().includes(query.toLowerCase()) ||
            memory.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.renderFilteredMemories(filteredMemories);
    }
    
    filterByFamily(familyId) {
        if (!familyId) {
            this.renderMemories();
            return;
        }
        
        const filteredMemories = this.memories.filter(memory => memory.familyMember === familyId);
        this.renderFilteredMemories(filteredMemories);
    }
    
    filterByType(type) {
        if (!type) {
            this.renderMemories();
            return;
        }
        
        const filteredMemories = this.memories.filter(memory => memory.type === type);
        this.renderFilteredMemories(filteredMemories);
    }
    
    renderFilteredMemories(filteredMemories) {
        const container = document.getElementById('gridView');
        container.innerHTML = '';
        
        if (filteredMemories.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">No memories found</h3>
                    <p class="text-gray-600">Try adjusting your search or filters.</p>
                </div>
            `;
            return;
        }
        
        filteredMemories.forEach((memory, index) => {
            const memoryCard = this.createMemoryCard(memory, index);
            container.appendChild(memoryCard);
        });
        
        // Animate filtered results
        anime({
            targets: '.memory-card',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(50),
            duration: 400,
            easing: 'easeOutCubic'
        });
    }
    
    generateMockCID() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let cid = 'Qm';
        for (let i = 0; i < 44; i++) {
            cid += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return cid;
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium`;
        
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500');
                break;
            case 'error':
                notification.classList.add('bg-red-500');
                break;
            case 'warning':
                notification.classList.add('bg-yellow-500');
                break;
            default:
                notification.classList.add('bg-blue-500');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInCubic',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }
}

// Utility functions
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.memoryChain = new MemoryChain();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MemoryChain;
}