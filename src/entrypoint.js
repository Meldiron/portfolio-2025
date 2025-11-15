export default (Alpine) => {
  Alpine.data("minigame", () => ({
    wheelVisible: false,
    wheelX: 0,
    wheelY: 0,
    relativeX: 0,
    relativeY: 0,
    options: ['⭐', '👏', '💎', '🔥', '💯', '❓'],
    emojis: [],
    sizes: ['text-lg', 'text-2xl', 'text-4xl'], // small, medium, large
    rotations: [-15, 0, 15],
    selectedSize: 'text-2xl', // default to medium
    selectedRotation: 0, // default to no rotation
    client: null,
    databases: null,
    isLoading: false,
    
    init() {
      // Initialize Appwrite
      this.client = new window.Appwrite.Client();
      this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("67c0eaa1002e13cf7a9e");
      this.databases = new window.Appwrite.Databases(this.client);
      
      // Subscribe to real-time database events
      this.client.subscribe(
        "databases.main.collections.stamps.documents",
        (response) => {
          if (
            response?.payload &&
            response.payload?.$collectionId === "stamps" &&
            response.payload?.$databaseId === "main"
          ) {
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
              // Add new emoji from database
              const data = response.payload;
              const newEmoji = {
                emoji: data.emoji,
                x: data.x,
                y: data.y,
                size: data.size,
                rotation: data.rotation,
                id: data.$id
              };
              this.emojis.push(newEmoji);
            }
          }
        }
      );
      
      // Load existing emojis from database
      this.loadEmojis();
      
      // Close wheel when clicking outside
      this.$nextTick(() => {
        document.addEventListener('click', (e) => {
          if (this.wheelVisible && !e.target.closest('[data-wheel]') && !e.target.closest('[data-board]')) {
            this.closeWheel();
          }
        });
      });
    },
    
    handleBoardClick(event) {
      event.stopPropagation();
      
      if(this.wheelVisible) {
        this.closeWheel();
        return;
      }
      
      const rect = event.currentTarget.getBoundingClientRect();
      this.relativeX = event.clientX - rect.left;
      this.relativeY = event.clientY - rect.top;
      this.wheelX = event.clientX;
      this.wheelY = event.clientY;
      this.wheelVisible = true;
    },
    
    async selectOption(option) {
      this.isLoading = true;
      
      const emojiData = {
        emoji: option,
        x: Math.floor(this.relativeX),
        y: Math.floor(this.relativeY),
        size: this.selectedSize,
        rotation: this.selectedRotation + ""
      };
      
      try {
        await this.databases.createDocument('main', 'stamps', window.Appwrite.ID.unique(), emojiData);
      } catch (error) {
        console.error('Failed to save emoji:', error);
      } finally {
        this.isLoading = false;
        this.closeWheel();
      }
    },
    
    async loadEmojis() {
      const response = await this.databases.listDocuments('main', 'stamps', [
        window.Appwrite.Query.limit(1000)
      ]);
      this.emojis = response.documents.map(doc => ({
        emoji: doc.emoji,
        x: doc.x,
        y: doc.y,
        size: doc.size,
        rotation: doc.rotation,
        id: doc.$id
      }));
    },
    
    closeWheel() {
      this.wheelVisible = false;
    }
  }))
};
