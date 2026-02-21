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
    emojiIds: null, // Set<string> for O(1) dedup, initialized in init()
    sizes: ["text-lg", "text-2xl", "text-4xl"], // small, medium, large
    rotations: [-15, 0, 15],
    selectedSize: "text-2xl", // default to medium
    selectedRotation: 0, // default to no rotation
    client: null,
    databases: null,
    isLoading: false,
    isPendingEmojis: false, // User has moved but loading hasn't started yet
    isLoadingEmojis: false, // Actual loading is in progress
    loadThrottleTimeout: null,
    loadGeneration: 0, // Incremented on each load to cancel stale requests

    emojiSizeToPx(size) {
      switch (size) {
        case "text-lg":
          return "2rem";
        case "text-2xl":
          return "2.5rem";
        case "text-4xl":
          return "3rem";
        default:
          return "1rem";
      }
    },

    // Add emoji only if not already tracked. Returns true if added.
    addEmoji(emoji) {
      if (this.emojiIds.has(emoji.id)) return false;
      this.emojiIds.add(emoji.id);
      this.emojis.push(emoji);
      return true;
    },

    // Remove emoji by ID from both the array and the Set.
    removeEmoji(id) {
      if (!this.emojiIds.has(id)) return;
      this.emojiIds.delete(id);
      this.emojis = this.emojis.filter((e) => e.id !== id);
    },

    // Remove emojis that are far outside the current viewport to free memory.
    cleanupDistantEmojis() {
      const canvasElement = document.querySelector("[data-board]");
      if (!canvasElement) return;

      const rect = canvasElement.getBoundingClientRect();
      const cleanupPadX = 3000;
      const cleanupPadY = 500;

      const left = -this.virtualX - cleanupPadX;
      const right = -this.virtualX + rect.width + cleanupPadX;
      const top = -this.virtualY - cleanupPadY;
      const bottom = -this.virtualY + rect.height + cleanupPadY;

      const removedIds = [];
      const kept = [];
      for (const emoji of this.emojis) {
        if (
          emoji.x < left ||
          emoji.x > right ||
          emoji.y < top ||
          emoji.y > bottom
        ) {
          removedIds.push(emoji.id);
        } else {
          kept.push(emoji);
        }
      }

      if (removedIds.length > 0) {
        this.emojis = kept;
        for (const id of removedIds) {
          this.emojiIds.delete(id);
        }
      }
    },

    init() {
      this.emojiIds = new Set();

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
            const data = response.payload;

            if (this.isEmojiInViewport(data.x, data.y)) {
              this.addEmoji({
                emoji: data.emoji,
                x: data.x,
                y: data.y,
                size: data.size,
                rotation: data.rotation,
                id: data.$id,
              });
            }
          } else if (
            response.events.includes("databases.*.tables.*.rows.*.delete")
          ) {
            this.removeEmoji(response.payload.$id);
          }
        },
      );

      // Load existing emojis from database
      this.loadEmojis();

      // Watch for changes to virtualX and virtualY to reload emojis
      this.$watch("virtualX", () => {
        this.throttledLoadEmojis();
      });

      this.$watch("virtualY", () => {
        this.throttledLoadEmojis();
      });

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
        this.isPendingEmojis = true;
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
        this.isPendingEmojis = true;
      }
    },

    handleMouseUp() {
      if (!this.isDragging) return;

      this.isDragging = false;

      // Ensure a final load for the resting position
      if (this.hasMoved) {
        this.throttledLoadEmojis();
      }

      // Only show wheel if user didn't move much (just clicked)
      if (!this.hasMoved) {
        this.wheelVisible = true;
      }
    },

    handleTouchEnd() {
      if (!this.isDragging) return;

      this.isDragging = false;

      // Ensure a final load for the resting position
      if (this.hasMoved) {
        this.throttledLoadEmojis();
      }

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

    // Leading-edge throttle: fires immediately, then at most once per 400ms.
    throttledLoadEmojis() {
      // If throttle cooldown is active, the trailing call at the end will pick
      // up whatever the latest position is.
      if (this.loadThrottleTimeout) return;

      // Fire immediately (leading edge)
      this.loadEmojis();

      // Set cooldown — when it expires, fire once more if position changed.
      this.loadThrottleTimeout = setTimeout(() => {
        this.loadThrottleTimeout = null;
        if (this.isPendingEmojis) {
          this.throttledLoadEmojis();
        }
      }, 400);
    },

    isEmojiInViewport(x, y) {
      // Get viewport dimensions
      const canvasElement = document.querySelector("[data-board]");
      if (!canvasElement) return false;

      const canvasRect = canvasElement.getBoundingClientRect();
      const viewportWidth = canvasRect.width;
      const viewportHeight = canvasRect.height;

      // Calculate visible area bounds based on current virtual position
      const leftBound = -this.virtualX;
      const rightBound = -this.virtualX + viewportWidth;
      const topBound = -this.virtualY;
      const bottomBound = -this.virtualY + viewportHeight;

      // Add some padding to include emojis slightly outside viewport
      const padding = 200;
      const paddedLeft = leftBound - padding;
      const paddedRight = rightBound + padding;
      const paddedTop = topBound - padding;
      const paddedBottom = bottomBound + padding;

      return (
        x >= paddedLeft &&
        x <= paddedRight &&
        y >= paddedTop &&
        y <= paddedBottom
      );
    },

    async loadEmojis() {
      // Increment generation to cancel any in-flight load
      const generation = ++this.loadGeneration;

      // Clear pending state and set loading state
      this.isPendingEmojis = false;
      this.isLoadingEmojis = true;

      // Get viewport dimensions
      const canvasElement = document.querySelector("[data-board]");
      if (!canvasElement) {
        this.isLoadingEmojis = false;
        return;
      }

      const canvasRect = canvasElement.getBoundingClientRect();
      const viewportWidth = canvasRect.width;
      const viewportHeight = canvasRect.height;

      // Calculate visible area bounds based on current virtual position
      const leftBound = -this.virtualX;
      const rightBound = -this.virtualX + viewportWidth;
      const topBound = -this.virtualY;
      const bottomBound = -this.virtualY + viewportHeight;

      // Add some padding to load emojis outside viewport for smooth scrolling
      const paddingX = 2000;
      const paddingY = 100;
      const paddedLeft = leftBound - paddingX;
      const paddedRight = rightBound + paddingX;
      const paddedTop = topBound - paddingY;
      const paddedBottom = bottomBound + paddingY;

      let cursor = null;
      do {
        // Bail out if a newer load has started
        if (this.loadGeneration !== generation) return;

        const queries = [
          window.Appwrite.Query.limit(1000),
          window.Appwrite.Query.greaterThanEqual("x", paddedLeft),
          window.Appwrite.Query.lessThanEqual("x", paddedRight),
          window.Appwrite.Query.greaterThanEqual("y", paddedTop),
          window.Appwrite.Query.lessThanEqual("y", paddedBottom),
        ];
        if (cursor) {
          queries.push(window.Appwrite.Query.cursorAfter(cursor));
        }
        try {
          const response = await this.databases.listDocuments(
            "main",
            "stamps",
            queries,
          );

          // Bail out if a newer load has started
          if (this.loadGeneration !== generation) return;

          // Incrementally merge — only add emojis we don't already have
          for (const doc of response.documents) {
            this.addEmoji({
              emoji: doc.emoji,
              x: doc.x,
              y: doc.y,
              size: doc.size,
              rotation: doc.rotation,
              id: doc.$id,
            });
          }

          if (response.documents.length > 0) {
            cursor = response.documents[response.documents.length - 1].$id;
          } else {
            cursor = null;
          }
        } catch (error) {
          console.error("Failed to load emojis:", error);
          cursor = null;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      } while (cursor !== null);

      // Only finalize if this is still the latest load
      if (this.loadGeneration !== generation) return;

      // Prune emojis that are far from the current viewport
      this.cleanupDistantEmojis();

      // Clear loading state
      this.isLoadingEmojis = false;
    },

    resetPosition() {
      this.isPendingEmojis = true;
      // Clear everything on teleport — old emojis are all distant
      this.emojis = [];
      this.emojiIds.clear();
      this.virtualX = 0;
      this.virtualY = 0;
      this.throttledLoadEmojis();
    },

    closeWheel() {
      this.wheelVisible = false;
    },
  }));
};
