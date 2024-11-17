import * as yup from "yup";

import Dictionary, { getDictionaryTypes } from "@/configs/dictionary";

export const signInDictionary = Dictionary.signin;
export const SignInDictionaryKeys = getDictionaryTypes(signInDictionary);

const { email, password } = Dictionary.signin;

export const validationSchema = yup.object({
  email: yup.string().email(email.invalid).required(email.required),
  password: yup.string().required(password.required),
});
