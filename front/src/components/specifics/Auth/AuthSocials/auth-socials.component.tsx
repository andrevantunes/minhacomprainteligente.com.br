import { Button, ButtonVariants } from "@andrevantunes/andrevds";

import { authSocials } from "@/configs/auth.config";
import { AuthSocialProps, AuthState } from "../auth.types";
import { UserStore } from "@/store";
import { DEFAULT_PLATFORM_SLUG } from "@/contexts/PlatformContext";

const AuthSocials = ({ isFetching, platformSlug }: AuthState) => {
  return (
    <>
      {!isFetching && (platformSlug === DEFAULT_PLATFORM_SLUG || platformSlug === "") && (
        <div className="auth-social">
          {authSocials.map((social) => (
            <SocialLoginButton
              key={social.name}
              {...social}
              isFetching={isFetching}
              platformSlug={platformSlug}
            />
          ))}
        </div>
      )}
    </>
  );
};

const SocialLoginButton = ({ iconName, name, isFetching, platformSlug }: AuthSocialProps) => {
  const handleClick = async () => UserStore.loginBySocial(name, platformSlug);
  const id = `${name.toLowerCase()}-login-button`;
  return (
    <Button
      title={`Continuar com ${name}`}
      id={id}
      variant={ButtonVariants.Neutral}
      className="auth-social__button"
      iconName={iconName}
      onClick={handleClick}
      disabled={isFetching}
    />
  );
};

export default AuthSocials;
