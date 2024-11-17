import * as yup from "yup";

import Dictionary, { getDictionaryTypes } from "@/configs/dictionary";

export const accountUpdateDictionary = {
  ...Dictionary.account,
  enemSubscriptionId: Dictionary.enemSubscriptionId,
};
export const AccountUpdateDictionaryKeys = getDictionaryTypes(accountUpdateDictionary);

const { enemSubscriptionId } = accountUpdateDictionary;

export const validationSchema = yup.object({
  enemSubscriptionId: yup.string().min(12, enemSubscriptionId.invalid).optional(),
});
