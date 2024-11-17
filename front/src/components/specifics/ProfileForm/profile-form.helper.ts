import { UserState } from "@/types";

export const userMock: UserState = {
  birthDate: "18-03-1995",
  firstLogin: false,
  email: "any_name@mesalva.com",
  enemSubscriptionId: null,
  guest: false,
  image: "https://cdn.mesalva.com/any_image.jpeg",
  name: "Any Name",
  phone: "(51)999999999",
  roles: [
    {
      name: "Desenvolvimento",
      slug: "dev",
    },
  ],
  settings: {
    userEventsMigrationStatus: {
      status: "done",
    },
    chatGuru: {
      sentAt: "2022-06-17",
    },
    onboarding: {
      finished: false,
      accepted: false,
      currentStep: 0,
    },
  },
  token: "any_token",
  uid: "any.email@mesalva.com",
  crmEmail: null,
  persona: {
    name: "PADRÃO ENEM",
    slug: "padrao-enem",
    brandImage: null,
  },
  fetching: false,
  fetched: true,
  error: false,
};
