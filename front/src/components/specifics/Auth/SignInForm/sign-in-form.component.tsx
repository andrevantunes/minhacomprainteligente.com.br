import { FormWithSubmitButton, PasswordField, TextField } from "@andrevantunes/andrevds";
import { useFormik } from "formik";
import { signInDictionary, SignInDictionaryKeys } from "./sign-in-form.validation";
import { UserStore } from "@/store";
import { AuthState } from "../auth.types";

const AuthSignIn = ({ isFetching, platformSlug }: AuthState) => {
  const { errors, isValid, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { email: "", password: "", platformSlug: null },
    onSubmit: async ({ email, password }) => null,
  });

  return (
    <FormWithSubmitButton
      id="sign-in-form"
      onSubmit={handleSubmit}
      submitButtonLabel={signInDictionary.submit.label}
      submitButtonId="sign-in-button"
      disabled={!isValid || isFetching}
      submitting={isFetching}
    >
      <TextField
        id={SignInDictionaryKeys.email}
        name={SignInDictionaryKeys.email}
        label={signInDictionary.email.label}
        error={touched.email && errors.email}
        value={values.email}
        onBlur={handleBlur}
        type="email"
        onChange={handleChange}
        required
        disabled={isFetching}
      />
      <PasswordField
        id={SignInDictionaryKeys.password}
        name={SignInDictionaryKeys.password}
        label={signInDictionary.password.label}
        error={touched.password && errors.password}
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        disabled={isFetching}
      />
    </FormWithSubmitButton>
  );
};

export default AuthSignIn;
