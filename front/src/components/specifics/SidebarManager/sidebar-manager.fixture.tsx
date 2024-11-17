import type { SidebarList } from "@andrevantunes/andrevds";

export const mockSidebarList: SidebarList = [
  {
    label: "Geral",
    items: [
      {
        label: "Painel do aluno",
        iconName: "painel",
        href: "/app/painel",
      },
      {
        label: "Turmas e Cursos",
        iconName: "turma",
        href: "/app/turmas",
      },
      {
        label: "Pesquisar",
        iconName: "search",
        href: "https://www.mesalva.com/me-salva/busca/me-salva",
      },
    ],
  },
  {
    label: "Aulas",
    items: [
      {
        label: "Matérias",
        iconName: "materias",
        href: "/app/materias",
      },
      {
        label: "Plano de estudos",
        iconName: "plano-de-estudos",
        href: "/app/plano-de-estudos",
      },
      {
        label: "Aulas ao vivo",
        iconName: "aula-ao-vivo",
        href: "/app/aulas-ao-vivo",
      },
      {
        label: "Redações",
        iconName: "correcao",
        href: "/app/redacao",
      },
      {
        label: "Exercícios e provas",
        iconName: "exercicio",
        href: "/app/exercicios-e-provas",
      },
      {
        label: "Mentorias",
        iconName: "mentoria",
        href: "/app/mentorias",
      },
      {
        label: "Apostilas",
        iconName: "apostila",
        href: "https://www.mesalva.com/enem/apostilas",
      },
    ],
  },
  {
    label: "Materiais",
    items: [
      {
        label: "Simulados",
        iconName: "simulado",
        href: "/app/simulados",
      },
      {
        label: "Banco de provas",
        iconName: "banco-de-prova",
        href: "/app/banco-de-provas",
      },
      {
        label: "Forúm de dúvidas",
        iconName: "forum",
        href: "https://forum.mesalva.com",
      },
      {
        label: "Academia do hábito",
        iconName: "academia-do-habito",
        href: "/app/academia-do-habito",
      },
      {
        label: "Loja de livros",
        iconName: "loja-de-livros",
        href: "https://loja.mesalva.com/",
      },
    ],
  },
  {
    label: "Opções",
    items: [
      {
        label: "Planos",
        iconName: "planos",
        href: "https://www.mesalva.com/#planos",
      },
      {
        label: "Ajuda",
        iconName: "ajuda",
        href: "https://ajuda.mesalva.com/pt-BR",
      },
      {
        label: "Sair",
        iconName: "sair",
        href: "/sair",
      },
    ],
  },
];
