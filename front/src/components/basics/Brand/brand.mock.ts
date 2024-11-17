import { UserProfile } from "@/types";

type UserBrandMock = Pick<UserProfile, "name" | "persona">;

export const userMed: UserBrandMock = {
  name: "any_user",
  persona: {
    name: "",
    slug: "",
    brandImage: "valid_brand_image.png",
  },
};

export const userWithoutImage: UserBrandMock = {
  name: "any_user",
  persona: {
    name: "",
    slug: "",
    brandImage: null,
  },
};
