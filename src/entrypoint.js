export default (Alpine) => {
  Alpine.data("minigame", (initState) => ({
    tools: initState.tools ?? [],
    scores: initState.scores ?? {},

    tool: "",

    init() {
      this.randomizeTool();
      this.updateScores();

      const { client } = this.getAppwrite();

      client.subscribe(
        "databases.main.collections.scores.documents",
        (response) => {
          if (
            response?.payload &&
            response.payload?.$collectionId === "scores" &&
            response.payload?.$databaseId === "main"
          ) {
            this.scores[response.payload.name] = response.payload.score;
          }
        },
      );
    },

    getAppwrite() {
      const client = new Appwrite.Client();
      client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("67c0eaa1002e13cf7a9e");
      const functions = new Appwrite.Functions(client);
      const databases = new Appwrite.Databases(client);

      return { functions, databases, client };
    },

    async updateScores() {
      const { databases } = this.getAppwrite();
      const scores = await databases.listDocuments("main", "scores", [
        Appwrite.Query.limit(100), // This deserves pagination if I ever know that many
      ]);
      const newScores = {};
      for (const document of scores.documents) {
        newScores[document.name] = document.score;
      }
      this.scores = newScores;
    },

    randomizeTool(attempt = 0) {
      if (attempt > 10) return;

      let originalTool = this.tool;
      const randomIndex = Math.floor(Math.random() * this.tools.length);
      this.tool = this.tools[randomIndex] ?? "";

      if (originalTool !== this.tool) {
        this.randomizeTool(attempt + 1);
      }
    },

    selectTool(tool) {
      this.tool = tool;
    },

    toVerbose(score) {
      return score > 0 ? `+${score}` : `${score}`;
    },

    voteNone() {
      this.randomizeTool();
    },

    votePlus() {
      this.vote(1);
    },

    voteMinus() {
      this.vote(-1);
    },

    vote(value) {
      this.saveToAppwrite(this.tool, value);
      this.scores[this.tool] = (this.scores[this.tool] ?? 0) + value;
      this.randomizeTool();
    },

    async saveToAppwrite(tool, value) {
      try {
        const { functions } = this.getAppwrite();
        const execution = await functions.createExecution(
          "voteInMinigame",
          JSON.stringify({
            value,
            tool,
          }),
          false,
          "/",
          "GET",
          {
            "content-type": "application/json",
          },
        );

        if (execution.responseStatusCode !== 204) {
          throw new Error(execution.responseBody ?? "Unknown error");
        }
      } catch (err) {
        console.error(err);
        alert("Minigame is out of service at the moment.");
        if (this.tools[tool] !== null && this.tools[tool] !== undefined) {
          this.tools[tool] -= value;
        }
      }
    },
  }));
};
