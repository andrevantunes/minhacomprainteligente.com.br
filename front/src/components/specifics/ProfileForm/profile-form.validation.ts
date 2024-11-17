import * as yup from "yup";
import Dictionary, { getDictionaryTypes } from "@/configs/dictionary";
import { testMinNumber } from "@/helpers/yup.helper";
const { name, phone, birthDate } = Dictionary.profile;
const enemSubscriptionId = Dictionary.enemSubscriptionId;
export const profileInDictionary = { ...Dictionary.profile, enemSubscriptionId };
export const ProfileInDictionaryKeys = getDictionaryTypes(profileInDictionary);
export const validationSchema = yup.object({
  name: yup.string().min(6, name.min).required(name.required),
  phone: yup.string().test(testMinNumber(11, phone.min)).required(phone.required),
  birthDate: yup.string().test(testMinNumber(8, birthDate.min)).required(birthDate.required),
  enemSubscriptionId: yup
    .string()
    .test(testMinNumber(12, enemSubscriptionId.min))
    .required(enemSubscriptionId.required),
});
