export const ptBr = {
  seo: {
    url: "https://www.mesalva.com",
    title: "Digital Flux Store",
    description: "Digital Flux Store",
    image: "/banners-site-nota-mil-sisu-desktop-1-scaled.jpg",
  },
  common: {
    required: "Este campo é obrigatório",
    notAuthenticated: "Você precisa estar logado para fazer isso",
    submitSuccess: "Dados salvos com sucesso!",
    submitError: "Ocorreu um erro ao salvar os dados.",
    min: "Este campo deve conter {minLength} dígitos!",
  },
  enemSubscriptionId: {
    label: "Número de Inscrição do ENEM",
    min: "O número de inscrição do ENEM deve conter mais caracteres",
    invalid: "O número de inscrição do ENEM deve ter 12 dígitos",
    required: "Insira o número de inscrição do ENEM",
    mask: "999999999999",
    submitSuccess: "Número de Inscrição foi inserido com sucesso!",
    submitError: "Ocorreu um erro ao inserir o número de inscrição",
    html: `<a href="https://ajuda.mesalva.com/pt-BR/articles/5612994-faq-como-visualizar-o-numero-de-inscricao-do-enem-e-recuperar-a-senha-de-cadastro" target="_blank">Não lembro meu número de inscrição</a>`,
  },
  account: {
    header: {
      id: "account-update",
      title: "Atualização da conta",
      subtitle: "",
      linkName: "",
    },
    whatsapp: {
      label: "WhatsApp",
      min: "O número deve conter mais caracteres",
      required: "Insira seu número de WhatsApp",
      mask: "(99) 99999-9999",
    },
    submit: {
      label: "Continuar",
      error: "Não foi possível atualizar a sua conta!",
      success: "Atualização efetuada com sucesso",
    },
    explanation: {
      html: `Consulte os <a target="_blank" href="https://www.mesalva.com/termos-de-uso/web" rel="noreferrer">termos de uso</a> e as <a target="_blank" href="https://www.mesalva.com/politica-de-privacidade/web" rel="noreferrer">políticas de privacidade</a>`,
    },
  },
  signin: {
    header: {
      id: "signin",
      title: "Entre na sua conta",
      subtitle: "Não é aluno Me Salva!?",
      linkName: "Cadastre-se agora",
    },
    email: {
      id: "signup",
      label: "E-mail",
      invalid: "Esse e-mail não é válido",
      required: "Insira o seu e-mail",
    },
    password: {
      label: "Senha",
      required: "Insira a sua senha",
    },
    submit: {
      label: "Entrar",
      error: "Verifique se o email e a senha estão corretos",
      success: "Login efetuado com sucesso",
    },
    explanation: {
      html: `Esqueceu sua senha? <a target="_blank" href="https://www.mesalva.com/esqueciasenha" rel="noreferrer">Recuperar minha senha</a>.`,
    },
  },
  signup: {
    header: {
      title: "Crie uma conta",
      subtitle: `Já é aluno Me Salva!?`,
      linkName: "Entre na sua conta",
    },
    name: {
      label: "Nome completo",
      min: "Seu nome precisa ser maior que 6 caracteres",
      required: "Insira o seu nome completo",
    },
    email: {
      label: "E-mail",
      invalid: "Esse e-mail não é válido",
      required: "Insira o seu e-mail",
    },
    whatsapp: {
      label: "WhatsApp",
      min: "O número deve conter mais caracteres",
      required: "Insira seu número de WhatsApp",
      mask: "(99) 99999-9999",
    },
    password: {
      label: "Senha",
      invalid:
        "A senha deve conter 8 caracteres com: 1 letra minúscula, 1 letra minúscula e 1 caractere especial",
      required: "Insira a sua senha",
    },
    crmAllowed: {
      label: "Aceito receber promoções do Me Salva!",
    },
    submit: {
      label: "Criar conta",
      error: "Não foi possível criar a sua conta!",
      success: "Cadastro efetuado com sucesso",
    },
    explanation: {
      html: `Ao criar sua conta, você estará concordando com os <a target="_blank" href="https://www.mesalva.com/termos-de-uso/web" rel="noreferrer">termos de uso</a> e as <a target="_blank" href="https://www.mesalva.com/politica-de-privacidade/web" rel="noreferrer">políticas de privacidade</a>`,
    },
  },
  signout: {
    expired: "Sua sessão expirou",
    redirect: "Você será redirecionado para a página de login",
  },
  socialLogin: {
    submit: {
      error: "Não foi possível continuar para a sua conta!",
      success: "Login efetuado com sucesso",
    },
  },
  profile: {
    id: "profile-form",
    personalInfo: "Informações Pessoais",
    studyInfo: "Informações de Estudo",
    changeEmail: "Trocar E-mail",
    avatar: {
      extensions: ["png", "jpg", "jpeg"],
    },
    name: {
      label: "Nome Completo",
      min: "Seu nome precisa ser maior que 6 caracteres",
      required: "Insira o seu nome completo",
    },
    email: {
      label: "E-mail",
    },
    persona: {
      label: "Perfil de Estudo",
    },
    whatsapp: {
      label: "WhatsApp",
      min: "O número deve conter mais caracteres",
      required: "Insira seu número de WhatsApp",
      mask: "(99) 99999-9999",
    },
    phone: {
      label: "WhatsApp",
      min: "O número deve conter mais caracteres",
      required: "Insira seu número de WhatsApp",
      mask: "(99) 99999-9999",
    },
    birthDate: {
      label: "Nascimento",
      min: "A data de nascimento deve conter mais caracteres",
      required: "Insira sua data de nascimento",
      mask: "99/99/9999",
    },
    educationLevel: {
      label: "Nível de Ensino",
    },
    objective: {
      label: "Objetivo",
    },
    recoverPassword: {
      label: "Trocar Senha",
      info: "Sua solicitação está sendo processada...",
      success: "Link enviado com sucesso para {email}",
      error: "Erro ao enviar link de recuperação!",
    },
    submit: {
      id: "profile-submit-button",
      label: "Salvar",
      error: "Não foi possível salvar os dados",
      success: "Dados salvos com sucesso",
    },
  },
  comment: {
    submit: {
      success: "Comentário enviado com sucesso",
      error: "Erro ao enviar comentário",
    },
    list: {
      now: "Agora mesmo",
      error: "Não foi possível carregar os comentários",
    },
  },
  medium: {
    report: "Tem algo de errado com esse conteúdo? Reporte aqui.",
  },
  essay: {
    rating: {
      title: "O que você achou dessa correção?",
      thumbUp: {
        text: "Gostei",
        acknowledgmentTitle: "Obrigado pela avaliação :)",
        acknowledgmentText: `A sua opinião é muito importante para nós! Se quiser, pode deixar um comentário clicando
      <a target="_blank" href="{url}">aqui</a>.`,
      },
      thumbDown: {
        text: "Não gostei",
        acknowledgmentTitle: "Poxa, que pena :(",
        acknowledgmentText: `Conte <a target="_blank" href="{url}">aqui</a> para a gente o que houve de errado, assim podemos sempre melhorar!`,
      },
      submit: {
        success: "Feedback enviado com sucesso",
        error: "Erro ao enviar feedback",
      },
    },
  },
};
