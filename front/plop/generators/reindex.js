/** @type { Partial<import("node-plop").PlopGeneratorConfig> } */
module.exports = {
  description: "Re-index all components",
  prompts: [
    {
      type: "confirm",
      message: "Are you sure you want to re-index all components?",
      name: "confirmed",
    },
  ],
  actions: [
    {
      type: "reindex",
      path: "src/components",
    },
  ],
};
