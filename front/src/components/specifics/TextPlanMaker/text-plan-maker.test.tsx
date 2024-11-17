import type { TextPlanMakerProps } from "./text-plan-maker.types";

import { render } from "@testing-library/react";

import TextPlanMaker from "./text-plan-maker.component";

const makeSut = (props?: TextPlanMakerProps) => render(<TextPlanMaker {...props} />);

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "/any-path",
      basePath: "/app",
      isReady: true,
    };
  },
}));

const textPlanMakerStepsMock = [
  {
    stepperTitle: "Início",
    title: "Plano de Texto",
    description:
      "O plano de texto ajuda você a estruturar suas ideias antes de iniciar a redação. Responda às perguntas para organizar suas ideias. Mas tente não usar mais do que 05 minutos para essa etapa.",
    videoId: "kgx4WGK0oNU",
  },
  {
    stepperTitle: "Ideias",
    title: "Ideais sobre o tema",
    description: "Liste todas suas ideias relacionadas com o assunto da proposta de redação.",
    placeholder: "Escreva ideias soltas, não se preocupe com o formato.",
  },
  {
    stepperTitle: "Tese",
    title: "Tese",
    description:
      "Agora você já se aqueceu! A tese é uma frase que guia todo o seu texto e deve apresentar sua opinião sobre o tema.",
    placeholder: "Escreva somente uma frase.",
  },
  {
    stepperTitle: "Argumento",
    title: "Primeiro Argumento",
    description:
      "No ENEM, você deverá escrever dois parágrafos com seus argumentos. Apresente aqui o primeiro e, se possível, utilize repertório.",
    placeholder: "Escreva somente uma frase.",
  },
  {
    stepperTitle: "Argumento",
    title: "Segundo Argumento",
    description:
      "No ENEM, você deverá escrever dois parágrafos com seus argumentos. Apresente aqui o primeiro e, se possível, utilize repertório.",
    placeholder: "Escreva somente uma frase.",
  },
  {
    stepperTitle: "Proposta",
    title: "Proposta de intervenção",
    description: "Liste todas suas ideias relacionadas com o assunto da proposta de redação.",
    placeholder: "",
  },
  {
    stepperTitle: "Revisão",
    title: "Seu plano de Texto",
    description: "",
  },
];

export const textPlanMakerPropsMock = {
  videoId: "any_video_id",
  setCurrentStep: jest.fn(),
  ideas: "",
  setIdeas: jest.fn(),
  thesis: "",
  setThesis: jest.fn(),
  firstArgument: "",
  setFirstArgument: jest.fn(),
  secondArgument: "",
  setSecondArgument: jest.fn(),
  agent: "",
  setAgent: jest.fn(),
  action: "",
  setAction: jest.fn(),
  means: "",
  setMeans: jest.fn(),
  setAim: jest.fn(),
  aim: "",
  className: "",
  handleSubmit: jest.fn(),
  loading: false,
  setLoading: jest.fn(),
  updating: false,
  topic: "",
  title: "",
  permalinkSlug: "",
  mediumToken: "",
  showModal: false,
  setShowModal: "",
};

describe("TextPlanMaker", () => {
  it("should render component", () => {
    const wrapper = makeSut({ steps: textPlanMakerStepsMock });
    expect(wrapper).toBeTruthy();
  });
});
