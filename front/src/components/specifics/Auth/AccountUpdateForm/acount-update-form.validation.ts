import * as yup from "yup";

import Dictionary, { getDictionaryTypes } from "@/configs/dictionary";
import { testMinNumber } from "@/helpers/yup.helper";
import { signupDictionary } from "../SignUpForm/sign-up.validation";

export const accountUpdateDictionary = {
  ...Dictionary.account,
  enemSubscriptionId: Dictionary.enemSubscriptionId,
};
export const AccountUpdateDictionaryKeys = getDictionaryTypes(accountUpdateDictionary);

const { whatsapp } = accountUpdateDictionary;
const { email } = signupDictionary;

export const validationSchema = yup.object({
  whatsapp: yup.string().test(testMinNumber(11, whatsapp.min)).required(whatsapp.required),
  crmEmail: yup.string().email(email.invalid).required(email.required),
});
