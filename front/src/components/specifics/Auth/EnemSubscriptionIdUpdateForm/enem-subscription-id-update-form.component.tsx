import { useFormik } from "formik";
import { Button, Caption, FormWithSubmitButton, Grid, TextField } from "@andrevantunes/andrevds";
import { AuthState } from "../auth.types";
import {
  accountUpdateDictionary,
  AccountUpdateDictionaryKeys,
  validationSchema,
} from "./enem-subscription-id-update-form.validation";
import { StoreType, UserStore, useStore } from "@/store";
import dictionary from "@/configs/dictionary";
import * as Cookies from "@/helpers/cookie.helper";

const ENEM_SUBSCRIPTION_ID_KEY = "skipEnemSubscriptionIdUpdateForm";

export const hasSubscriptionIdCookie = () => {
  return !!Cookies.get({})[ENEM_SUBSCRIPTION_ID_KEY];
};

interface EnemSubscriptionIdUpdateFormProps extends AuthState {
  goToNext: VoidFunction;
}

const EnemSubscriptionIdUpdateForm = ({
  isFetching,
  goToNext,
}: EnemSubscriptionIdUpdateFormProps) => {
  const [user] = useStore(StoreType.User);
  const { errors, isValid, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      enemSubscriptionId: user.enemSubscriptionId || "",
    },
    validationSchema,
    onSubmit: async ({ enemSubscriptionId }) => {
      const data: any = {};
      if (enemSubscriptionId.length > 0) data.enemSubscriptionId = enemSubscriptionId;
      return UserStore.updateProfile(data).then(() => {
        document.cookie = "skipEnemSubscriptionIdUpdateForm=1;";
        return goToNext;
      });
    },
  });

  return (
    <Grid>
      <FormWithSubmitButton
        className="mt-xl pt-md"
        onSubmit={handleSubmit}
        id="account-update-form"
        submitButtonLabel={dictionary.account.submit.label}
        submitButtonId="account-update-button"
        disabled={!isValid || isFetching}
        submitting={isFetching}
      >
        <TextField
          id={AccountUpdateDictionaryKeys.enemSubscriptionId}
          name={AccountUpdateDictionaryKeys.enemSubscriptionId}
          label={accountUpdateDictionary.enemSubscriptionId.label}
          mask={accountUpdateDictionary.enemSubscriptionId.mask}
          error={touched.enemSubscriptionId && errors.enemSubscriptionId}
          value={values.enemSubscriptionId}
          onBlur={handleBlur}
          onChange={handleChange}
          type="numeric"
          autoComplete="off"
          minLength={12}
          disabled={isFetching}
        />
        <div>
          <Caption
            className="auth-explanation"
            html={accountUpdateDictionary.enemSubscriptionId.html}
          />
        </div>
      </FormWithSubmitButton>
      <Button
        variant="secondary"
        onClick={() => {
          Cookies.set({}, ENEM_SUBSCRIPTION_ID_KEY, "true", { maxAge: 60 * 60 * 24 * 7 });
          goToNext();
        }}
      >
        Pular etapa
      </Button>
    </Grid>
  );
};

export default EnemSubscriptionIdUpdateForm;
