import { Heading, HeadingSizes, Text, TextSizes } from "@andrevantunes/andrevds";
import { useRouter } from "next/router";

import dictionary from "@/configs/dictionary";
import { DEFAULT_PLATFORM_SLUG, PlatformContext } from "@/contexts/PlatformContext";
import { useContext } from "react";
import { AuthHeaderProps } from ".";
import { AuthModalContext } from "@/contexts/AuthModalContext/auth-modal-context.component";

const AuthHeader = ({ context = "modal" }: AuthHeaderProps) => {
  const router = useRouter();
  const { toggleSign, isSignIn } = useContext(AuthModalContext);
  const { header } = isSignIn ? dictionary.signin : dictionary.signup;
  const { title, subtitle, linkName } = header;
  const { platformSlug, fetched } = useContext(PlatformContext);
  const id = isSignIn ? "signin" : "signup";
  const buttonId = `redirect-to-${id}-button`;

  const toggleSignMode = () => {
    if (context === "modal") {
      if (router?.query?.sign) {
        delete router.query.sign;
      }
      return toggleSign?.();
    }

    const pathname = isSignIn ? "/cadastro" : "/entrar";
    const slug = platformSlug === DEFAULT_PLATFORM_SLUG ? "" : `/${platformSlug}`;
    const route = `${pathname}${slug}`;
    toggleSign?.();
    router.push(route);
  };

  return (
    <div className="auth-header">
      <Heading className="auth-header__title" level={2} size={HeadingSizes.Small}>
        {title}
      </Heading>
      {fetched && (platformSlug === DEFAULT_PLATFORM_SLUG || platformSlug === "") && (
        <Text className="auth-header__subtitle" size={TextSizes.Small}>
          <span>{subtitle} </span>
          <button id={buttonId} className="link" onClick={toggleSignMode}>
            {linkName}
          </button>
        </Text>
      )}
    </div>
  );
};

export default AuthHeader;
