/** @type { Partial<import("node-plop").PlopGeneratorConfig> } */
module.exports = {
  description: "Create a new component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What is the name of your component?",
    },
    {
      type: "input",
      name: "path",
      message: "Where should your component be?",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/components/{{path}}/{{pascalCase name}}/{{kebabCase name}}.component.tsx",
      templateFile: "plop/templates/component/component.hbs",
    },
    {
      type: "add",
      path: "src/components/{{path}}/{{pascalCase name}}/{{kebabCase name}}.types.ts",
      templateFile: "plop/templates/component/types.hbs",
    },
    {
      type: "add",
      path: "src/components/{{path}}/{{pascalCase name}}/{{kebabCase name}}.styles.scss",
      templateFile: "plop/templates/component/style.hbs",
    },
    {
      type: "add",
      path: "src/components/{{path}}/{{pascalCase name}}/{{kebabCase name}}.test.tsx",
      templateFile: "plop/templates/component/test.hbs",
    },
    {
      type: "add",
      path: "src/components/{{path}}/{{pascalCase name}}/index.ts",
      templateFile: "plop/templates/component/index.hbs",
    },
    {
      type: "reindex",
      path: "src/components",
    },
  ],
};
