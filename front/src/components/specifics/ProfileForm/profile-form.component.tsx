import { Grid } from "@/components/basics/Grid";
import { getStore, StoreType, UserStore } from "@/store";
import {
  AvatarField,
  Divider,
  FormWithSubmitButton,
  Notification,
  SelectField,
  Skeleton,
  Subtitle,
  Text,
  TextField,
} from "@andrevantunes/andrevds";
import { useFormik } from "formik";
import { profileInDictionary, ProfileInDictionaryKeys } from "./profile-form.validation";
import { getProfileEducation, recoverPassword } from "@/requests/profile.request";
import { useEffect, useState } from "react";
import { Link } from "@/components";
import { UserProfile } from "@/types";
import { TEN_MB } from "../EssaySendForm/essay-send-form.helper";
import { ProfileFormProps } from "./profile-form.types";

const ProfileForm = ({}: ProfileFormProps) => {
  const [isProfileEducationFetched, setIsProfileEducationFetched] = useState(false);
  const [profileEducation, setProfileEducation] = useState({ educations: [], objectives: [] });
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (isProfileEducationFetched) return;
    getProfileEducation()
      .then(setProfileEducation)
      .then(() => setIsProfileEducationFetched(true));
  }, []);

  const user = getStore(StoreType.User);

  const isFetching = user.fetching;

  const updateProfile = async (
    user: Partial<
      UserProfile & {
        educationLevelId: string;
        objectiveId: string;
      }
    >
  ) => {
    return UserStore.updateProfile({ ...user, image })
      .then(() => Notification.success(profileInDictionary.submit.success))
      .catch(() => Notification.error(profileInDictionary.submit.error));
  };

  const { errors, isValid, values, touched, handleChange, handleBlur, handleSubmit, setValues } =
    useFormik({
      initialValues: {
        name: user.name,
        phone: user.phone,
        birthDate: user.birthDate,
        enemSubscriptionId: user.enemSubscriptionId,
        educationLevelId: user.educationLevel?.id,
        objectiveId: user.objective?.id,
      },
      onSubmit: updateProfile,
    });

  const changePassword = async () => {
    Notification.info(profileInDictionary.recoverPassword.info);
    return recoverPassword(user.email)
      .then(() => {
        const message = profileInDictionary.recoverPassword.success.replace("{email}", user.email);
        Notification.success(message);
      })
      .catch(() => {
        Notification.error(profileInDictionary.recoverPassword.error);
      });
  };

  return (
    <div className="profile-form">
      <AvatarField
        className="mb-xl pb-xl"
        src={user.image || ""}
        extensions={profileInDictionary.avatar.extensions}
        maxSize={TEN_MB}
        onUploadFile={setImage}
      />
      <Text size="sm">
        <Link
          className="mr-xl"
          variant="secondary"
          iconName="key"
          iconSize="sm"
          onClick={changePassword}
        >
          {profileInDictionary.recoverPassword.label}
        </Link>
        <Link
          variant="secondary"
          iconName="mail"
          iconSize="sm"
          href="https://www.mesalva.com/user/trocar-email"
        >
          {profileInDictionary.changeEmail}
        </Link>
      </Text>
      <Divider className="mb-xl mt-sm" />
      <FormWithSubmitButton
        id={profileInDictionary.id}
        onSubmit={handleSubmit}
        submitButtonLabel={profileInDictionary.submit.label}
        submitButtonId={profileInDictionary.submit.id}
        disabled={!isValid || isFetching}
        submitting={isFetching}
      >
        <Grid columns={{ md: 2 }} className="profile-form__group">
          <Subtitle className="profile-form__title" level="3" size="md">
            {profileInDictionary.personalInfo}
          </Subtitle>
          <TextField
            id={ProfileInDictionaryKeys.name}
            name={ProfileInDictionaryKeys.name}
            label={profileInDictionary.name.label}
            error={touched.name && errors.name}
            onBlur={handleBlur}
            onChange={handleChange}
            required
            disabled={isFetching}
            type="text"
            value={values.name}
          />
          <TextField
            id={ProfileInDictionaryKeys.email}
            label={profileInDictionary.email.label}
            value={user.email}
            disabled
          />
          <TextField
            id={ProfileInDictionaryKeys.phone}
            name={ProfileInDictionaryKeys.phone}
            label={profileInDictionary.phone.label}
            mask={profileInDictionary.phone.mask}
            error={touched.phone && errors.phone}
            onBlur={handleBlur}
            onChange={handleChange}
            type="tel"
            disabled={isFetching}
            value={values.phone || ""}
          />
          <TextField
            id={ProfileInDictionaryKeys.birthDate}
            name={ProfileInDictionaryKeys.birthDate}
            label={profileInDictionary.birthDate.label}
            mask={profileInDictionary.birthDate.mask}
            error={touched.birthDate && errors.birthDate}
            onBlur={handleBlur}
            onChange={handleChange}
            required
            disabled={isFetching}
            type="tel"
            value={values.birthDate || ""}
          />
        </Grid>
        <Grid columns={{ md: 2 }} className="profile-form__group">
          <Subtitle className="profile-form__title" level="3" size="md">
            {profileInDictionary.studyInfo}
          </Subtitle>
          <Skeleton active={!isProfileEducationFetched}>
            <SelectField
              options={profileEducation.educations}
              defaultOption={profileEducation.educations.find(
                ({ value }) => value === values.educationLevelId
              )}
              label={profileInDictionary.educationLevel.label}
              id={ProfileInDictionaryKeys.educationLevel}
              name={ProfileInDictionaryKeys.educationLevel}
              onSelect={({ value }) => setValues({ ...values, educationLevelId: value })}
            />
          </Skeleton>
          <Skeleton active={!isProfileEducationFetched}>
            <SelectField
              options={profileEducation.objectives}
              defaultOption={profileEducation.objectives.find(
                ({ value }) => value === values.objectiveId
              )}
              label={profileInDictionary.objective.label}
              id={ProfileInDictionaryKeys.objective}
              name={ProfileInDictionaryKeys.objective}
              onSelect={({ value }) => setValues({ ...values, objectiveId: value })}
            />
          </Skeleton>
          <TextField
            id={ProfileInDictionaryKeys.enemSubscriptionId}
            name={ProfileInDictionaryKeys.enemSubscriptionId}
            label={profileInDictionary.enemSubscriptionId.label}
            mask={profileInDictionary.enemSubscriptionId.mask}
            error={touched.enemSubscriptionId && errors.enemSubscriptionId}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={isFetching}
            value={values.enemSubscriptionId || ""}
          />
        </Grid>
      </FormWithSubmitButton>
    </div>
  );
};

export default ProfileForm;
