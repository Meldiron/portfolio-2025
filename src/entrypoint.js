export default (Alpine) => {
  Alpine.data("minigame", () => ({
    wheelVisible: false,
    wheelX: 0,
    wheelY: 0,
    relativeX: 0,
    relativeY: 0,
    virtualX: 0, // Virtual grid X offset
    virtualY: 0, // Virtual grid Y offset
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartVirtualX: 0,
    dragStartVirtualY: 0,
    clickStartX: 0,
    clickStartY: 0,
    hasMoved: false,
    options: ["⭐", "👏", "💎", "🔥", "💯", "❓"],
    emojis: [],
    sizes: ["text-lg", "text-2xl", "text-4xl"], // small, medium, large
    rotations: [-15, 0, 15],
    selectedSize: "text-2xl", // default to medium
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
          if (response.events.includes("databases.*.tables.*.rows.*.create")) {
            // Add new emoji from database
            const data = response.payload;
            const newEmoji = {
              emoji: data.emoji,
              x: data.x,
              y: data.y,
              size: data.size,
              rotation: data.rotation,
              id: data.$id,
            };
            this.emojis.push(newEmoji);
          } else if (
            response.events.includes("databases.*.tables.*.rows.*.delete")
          ) {
            // Remove deleted emoji from database
            const deletedId = response.payload.$id;
            this.emojis = this.emojis.filter((emoji) => emoji.id !== deletedId);
          }
        },
      );

      // Load existing emojis from database
      this.loadEmojis();

      // Close wheel when clicking outside
      this.$nextTick(() => {
        document.addEventListener("click", (e) => {
          if (
            this.wheelVisible &&
            !e.target.closest("[data-wheel]") &&
            !e.target.closest("[data-board]")
          ) {
            this.closeWheel();
          }
        });

        // Add mouse event listeners for panning
        document.addEventListener("mousemove", (e) => {
          if (this.isDragging) {
            this.handleMouseMove(e);
          }
        });

        document.addEventListener("mouseup", (e) => {
          if (this.isDragging) {
            this.handleMouseUp(e);
          }
        });

        // Add touch event listeners for mobile devices
        document.addEventListener(
          "touchmove",
          (e) => {
            if (this.isDragging) {
              e.preventDefault(); // Prevent scrolling
              this.handleTouchMove(e);
            }
          },
          { passive: false },
        );

        document.addEventListener("touchend", (e) => {
          if (this.isDragging) {
            this.handleTouchEnd(e);
          }
        });
      });
    },

    handleBoardClick(event) {
      event.stopPropagation();

      if (this.wheelVisible) {
        this.closeWheel();
        return;
      }

      // Get coordinates from either mouse or touch event
      const clientX =
        event.clientX || (event.touches && event.touches[0].clientX);
      const clientY =
        event.clientY || (event.touches && event.touches[0].clientY);

      // Start potential drag operation
      this.isDragging = true;
      this.hasMoved = false;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.dragStartVirtualX = this.virtualX;
      this.dragStartVirtualY = this.virtualY;
      this.clickStartX = clientX;
      this.clickStartY = clientY;

      const rect = event.currentTarget.getBoundingClientRect();
      this.relativeX = clientX - rect.left;
      this.relativeY = clientY - rect.top;
      this.wheelX = this.relativeX;
      this.wheelY = this.relativeY;
    },

    handleTouchStart(event) {
      // Treat touch start like a board click
      this.handleBoardClick(event);
    },

    handleMouseMove(event) {
      if (!this.isDragging) return;

      const deltaX = event.clientX - this.dragStartX;
      const deltaY = event.clientY - this.dragStartY;

      // Update virtual grid position
      this.virtualX = Math.round(this.dragStartVirtualX + deltaX);
      this.virtualY = Math.round(this.dragStartVirtualY + deltaY);

      // Check if user has moved significantly (more than 5 pixels)
      const totalDistance = Math.sqrt(
        Math.pow(event.clientX - this.clickStartX, 2) +
          Math.pow(event.clientY - this.clickStartY, 2),
      );

      if (totalDistance > 5) {
        this.hasMoved = true;
      }
    },

    handleTouchMove(event) {
      if (!this.isDragging) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - this.dragStartX;
      const deltaY = touch.clientY - this.dragStartY;

      // Update virtual grid position
      this.virtualX = Math.round(this.dragStartVirtualX + deltaX);
      this.virtualY = Math.round(this.dragStartVirtualY + deltaY);

      // Check if user has moved significantly (more than 5 pixels)
      const totalDistance = Math.sqrt(
        Math.pow(touch.clientX - this.clickStartX, 2) +
          Math.pow(touch.clientY - this.clickStartY, 2),
      );

      if (totalDistance > 5) {
        this.hasMoved = true;
      }
    },

    handleMouseUp() {
      if (!this.isDragging) return;

      this.isDragging = false;

      // Only show wheel if user didn't move much (just clicked)
      if (!this.hasMoved) {
        this.wheelVisible = true;
      }
    },

    handleTouchEnd() {
      if (!this.isDragging) return;

      this.isDragging = false;

      // Only show wheel if user didn't move much (just tapped)
      if (!this.hasMoved) {
        this.wheelVisible = true;
      }
    },

    async selectOption(option) {
      this.isLoading = true;

      const emojiData = {
        emoji: option,
        x: Math.floor(this.relativeX - this.virtualX),
        y: Math.floor(this.relativeY - this.virtualY),
        size: this.selectedSize,
        rotation: this.selectedRotation + "",
      };

      try {
        await this.databases.createDocument(
          "main",
          "stamps",
          window.Appwrite.ID.unique(),
          emojiData,
        );
      } catch (error) {
        console.error("Failed to save emoji:", error);
      } finally {
        this.isLoading = false;
        this.closeWheel();
      }
    },

    async loadEmojis() {
      let cursor = null;
      do {
        const queries = [window.Appwrite.Query.limit(1000)];
        if (cursor) {
          queries.push(window.Appwrite.Query.cursorAfter(cursor));
        }
        const response = await this.databases.listDocuments(
          "main",
          "stamps",
          queries,
        );
        this.emojis.push(
          ...response.documents.map((doc) => ({
            emoji: doc.emoji,
            x: doc.x,
            y: doc.y,
            size: doc.size,
            rotation: doc.rotation,
            id: doc.$id,
          })),
        );
        if (response.documents.length > 0) {
          cursor = response.documents[response.documents.length - 1].$id;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      } while (cursor !== null);
    },

    closeWheel() {
      this.wheelVisible = false;
    },
  }));
};
