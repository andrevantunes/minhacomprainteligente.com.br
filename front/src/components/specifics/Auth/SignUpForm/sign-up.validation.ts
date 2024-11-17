import * as yup from "yup";

import Dictionary, { getDictionaryTypes } from "@/configs/dictionary";
import { testMinNumber } from "@/helpers/yup.helper";
import { validateSpecialCharacters } from "@andrevantunes/andrevds";

export const signupDictionary = Dictionary.signup;
export const SignupDictionaryKeys = getDictionaryTypes(signupDictionary);

const { name, email, whatsapp, password } = signupDictionary;

export const validationSchema = yup.object({
  name: yup.string().min(6, name.min).required(name.required),
  email: yup.string().email(email.invalid).required(email.required),
  whatsapp: yup.string().test(testMinNumber(11, whatsapp.min)).required(whatsapp.required),
  password: yup.string().test({
    test: (value: any) => validateSpecialCharacters(value),
    message: password.invalid,
  }),
  crmAllowed: yup.boolean(),
});
