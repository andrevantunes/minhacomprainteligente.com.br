module.exports = {
  types: [
    { value: "feat", name: "✨ feat:     Adição de uma nova funcionalidade" },
    { value: "fix", name: "🐛 fix:      Correção de bug" },
    { value: "docs", name: "📚 docs:     Alterações na documentação" },
    {
      value: "style",
      name: "🎨 style:    Mudanças de estilo que não afetam a lógica do código",
    },
    {
      value: "refactor",
      name: "🔨 refactor: Refatoração de código sem adição de funcionalidades ou correção de bugs",
    },
    {
      value: "perf",
      name: "🚀 perf:     Melhoria de performance",
    },
    {
      value: "test",
      name: "✅ test:     Adição ou correção de testes",
    },
    {
      value: "build",
      name: "📦 build:    Mudanças que afetam o sistema de build ou dependências externas",
    },
    {
      value: "ci",
      name: "🔧 ci:       Mudanças na configuração de CI ou scripts",
    },
    {
      value: "chore",
      name: "📝 chore:    Tarefas de manutenção que não alteram o código fonte ou testes",
    },
    { value: "revert", name: "↩️ revert:   Reverter um commit anterior" },
  ],
  scopes: [
    {
      name: "config",
      description: "Mudanças na configuração do projeto ou de ferramentas",
    },
    { name: "tests", description: "Modificações nos testes" },
    { name: "docs", description: "Atualizações na documentação" },
  ],
  messages: {
    type: "Selecione o tipo de mudança que você está cometendo:",
    scope: "Denomine o escopo desta mudança (opcional):",
    subject: "Escreva uma descrição breve e clara da mudança:\n",
    body: "Forneça uma descrição detalhada da mudança (opcional). Use '|' para quebras de linha:\n",
    breaking:
      "Liste quaisquer mudanças que quebram a compatibilidade (opcional):\n",
    footer:
      "Liste quaisquer issues fechadas por esta mudança (ex: #123, #456) (opcional):\n",
    confirmCommit: "Tem certeza que deseja continuar com o commit acima?",
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 100,
};
