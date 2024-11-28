import { DEFAULT_PLATFORM_SLUG, PlatformContext } from "@/contexts/PlatformContext";
import {
  Checkbox,
  FormWithSubmitButton,
  PasswordStrongField,
  TextField,
} from "@andrevantunes/andrevds";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthState } from "../auth.types";
import { signupDictionary, SignupDictionaryKeys, validationSchema } from "./sign-up.validation";

function AuthSignUp({ isFetching }: AuthState) {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { platformSlug: slug } = useContext(PlatformContext);

  const { errors, isValid, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { name: "", email: "", password: "", whatsapp: "", crmAllowed: true },
    validationSchema,
    onSubmit: async ({ name, email, whatsapp, password, crmAllowed }) => {
      if (!isPasswordValid) return;
      const platformSlug = slug === DEFAULT_PLATFORM_SLUG ? "" : slug;
      return { name, whatsapp, email, password, crmAllowed, platformSlug };
    },
  });

  return (
    <FormWithSubmitButton
      onSubmit={handleSubmit}
      id="sign-up-form"
      submitButtonLabel={signupDictionary.submit.label}
      submitButtonId="sign-up-button"
      disabled={!isPasswordValid || !isValid || isFetching}
      submitting={isFetching}
    >
      <TextField
        id={SignupDictionaryKeys.name}
        name={SignupDictionaryKeys.name}
        label={signupDictionary.name.label}
        error={touched.name && errors.name}
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        disabled={isFetching}
      />
      <TextField
        id={SignupDictionaryKeys.email}
        name={SignupDictionaryKeys.email}
        label={signupDictionary.email.label}
        error={touched.email && errors.email}
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        type="email"
        required
        disabled={isFetching}
      />
      <TextField
        id={SignupDictionaryKeys.whatsapp}
        name={SignupDictionaryKeys.whatsapp}
        label={signupDictionary.whatsapp.label}
        mask={signupDictionary.whatsapp.mask}
        error={touched.whatsapp && errors.whatsapp}
        value={values.whatsapp}
        onBlur={handleBlur}
        onChange={handleChange}
        type="tel"
        required
        disabled={isFetching}
      />
      <PasswordStrongField
        id={SignupDictionaryKeys.password}
        name={SignupDictionaryKeys.password}
        label={signupDictionary.password.label}
        error={touched.password && !isPasswordValid}
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        disabled={isFetching}
        onValid={setIsPasswordValid}
      />
      <Checkbox
        id={SignupDictionaryKeys.crmAllowed}
        name={SignupDictionaryKeys.crmAllowed}
        label={signupDictionary.crmAllowed.label}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={isFetching}
        defaultChecked={values.crmAllowed}
      />
    </FormWithSubmitButton>
  );
}

export default AuthSignUp;
