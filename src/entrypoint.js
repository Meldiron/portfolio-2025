export default (Alpine) => {
  Alpine.data("minigame", (initState) => ({
    tools: initState.tools ?? [],
    scores: initState.scores ?? {},

    tool: "",

    init() {
      this.randomizeTool();
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
      const client = new Appwrite.Client();
      client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("67c0eaa1002e13cf7a9e");
      const functions = new Appwrite.Functions(client);

      try {
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
