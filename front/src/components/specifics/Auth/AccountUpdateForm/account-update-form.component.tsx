import { useFormik } from "formik";
import { FormWithSubmitButton, TextField } from "@andrevantunes/andrevds";
import { AuthState } from "../auth.types";
import {
  accountUpdateDictionary,
  AccountUpdateDictionaryKeys,
  validationSchema,
} from "./acount-update-form.validation";
import { StoreType, UserStore, useStore } from "@/store";
import dictionary from "@/configs/dictionary";
import { signupDictionary } from "../SignUpForm/sign-up.validation";

interface WhatsAppUpdateFormProps extends AuthState {
  goToNext: VoidFunction;
}

const AcountUpdateForm = ({ isFetching, goToNext }: WhatsAppUpdateFormProps) => {
  const [user] = useStore(StoreType.User);
  const { errors, isValid, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      whatsapp: user.phone || "",
      crmEmail: user.email || "",
    },
    validationSchema,
    onSubmit: async ({ whatsapp, crmEmail }) => {
      const data: any = { phone: whatsapp, crmEmail };
      if (whatsapp && crmEmail && whatsapp === user.phone && crmEmail === user.email)
        return goToNext();
      return UserStore.updateProfile(data).then(goToNext);
    },
  });

  return (
    <FormWithSubmitButton
      className="mt-xl pt-md"
      onSubmit={handleSubmit}
      id="account-update-form"
      submitButtonLabel={dictionary.account.submit.label}
      submitButtonId="account-update-button"
      disabled={!isValid || isFetching || !values.whatsapp}
      submitting={isFetching}
    >
      <TextField
        id={AccountUpdateDictionaryKeys.whatsapp}
        name={AccountUpdateDictionaryKeys.whatsapp}
        label={accountUpdateDictionary.whatsapp.label}
        mask={accountUpdateDictionary.whatsapp.mask}
        error={touched.whatsapp && errors.whatsapp}
        value={values.whatsapp}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        disabled={isFetching}
      />
      <TextField
        id="crmEmail"
        name="crmEmail"
        label={signupDictionary.email.label}
        error={touched.crmEmail && errors.crmEmail}
        value={values.crmEmail}
        onBlur={handleBlur}
        onChange={handleChange}
        type="email"
        required
        disabled={isFetching}
      />
    </FormWithSubmitButton>
  );
};

export default AcountUpdateForm;
