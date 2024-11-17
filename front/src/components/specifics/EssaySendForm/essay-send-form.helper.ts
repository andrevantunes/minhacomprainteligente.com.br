export const TEN_MB = 10 * 1024 * 1024;

export const IMAGE_EXTENSIONS = ["png", "jpeg", "jpg"];

export const successRedirectPath = "/app/redacao/minhas";

export const dictionary = {
  title: "Enviar redação",
  form: {
    proposal: { title: "Tema", label: "Digite o tema aqui", name: "essay-proposal-name" },
    file: { title: "Arquivo", name: "essay-proposal-file" },
    confirmation: {
      name: "essay-proposal-confirmation",
      label:
        "Certifico que essa redação é de minha autoria e respeita os demais termos de uso do Me Salva!",
    },
    submit: {
      label: "Enviar",
      success: "Redação enviada com sucesso!",
      error: "Erro ao enviar redação, tente mais tarde.",
    },
  },
};

interface MountEssayExplanationListProps {
  essayPersonalCorrection: boolean;
  correctionStyleName?: string;
}

type MountEssayExplanationList = (props: MountEssayExplanationListProps) => string[];

export const mountEssayExplanationList: MountEssayExplanationList = ({
  essayPersonalCorrection,
  correctionStyleName,
}) => {
  const type = essayPersonalCorrection ? "Correção personalizada" : "Correção padrão";
  return [
    "A correção será feita com o prazo de <strong>10 dias úteis</strong> após o envio.",
    correctionStyleName
      ? `A correção será feita com o estilo de <strong>${correctionStyleName}</strong>`
      : "Esta redação será corrigida segundo os critérios do tema selecionado",
    `Tipo de correção: <strong>${type}</strong>`,
    "A redação será enviada junto com o rascunho, caso tenha, mas o rascunho não faz parte da correção.",
  ];
};

export const getCorrectionType = (essayPersonalCorrection = false) =>
  essayPersonalCorrection ? "redacao-personalizada" : "redacao-padrao";
