import { Brand } from "@/components";
import config from "@/configs/app.config";
import dictionary from "@/configs/dictionary";
import {
  ensureStartWithSlash,
  isExternalLink,
  removeBasePath,
  removeExtraSlash,
  startBasePath,
  trimSlashes,
} from "@/helpers/links.helpers";
import { pushWithParameters } from "@/helpers/router.helpers";
import { StoreType, useStore } from "@/store";
import { Caption, Heading } from "@andrevantunes/andrevds";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthProps } from "./auth.types";
import AuthHeader from "./AuthHeader";
import AuthSocials from "./AuthSocials";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import WhatsAppUpdateForm from "./AccountUpdateForm";

const Auth = ({ sign = "in", setSign, close, context = "modal" }: AuthProps) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [confirmAccountUpdate, setConfirmAccountUpdate] = useState(false);
  const router = useRouter();
  const [user] = useStore(StoreType.User);
  const { path = "/", epath } = router.query;
  const platformSlug = String(router.query.platformSlug || "");

  const isAuth = !user.guest && user.fetched;

  const goToInitialStep = () => {
    setConfirmAccountUpdate(false);
    goToFinishStep();
  };

  const goToFinishStep = () => {
    setIsRedirecting(true);

    if (context === "modal") {
      if (!path || path === "/") {
        return router.reload();
      } else {
        pushWithParameters(router);
        return close?.();
      }
    }

    const externalPath = typeof epath === "string" ? decodeURIComponent(epath) : undefined;
    if (externalPath) return location.replace(removeExtraSlash(ensureStartWithSlash(externalPath)));

    const nextPath = removeExtraSlash(typeof path === "string" ? decodeURIComponent(path) : "/");

    if (nextPath && /enem-e-vestibulares|engenharia|ciencias-da-saude/.test(nextPath)) {
      return location.replace(ensureStartWithSlash(nextPath));
    }

    /* TODO: verificar a se a regra é válida para outros platformsSlug */
    /* TODO: passar essa regra de página inicial para o backend */
    const objectiveName = user.objective?.name || "";
    if (/engenharia/i.test(objectiveName)) return location.replace("/engenharia/cursos");
    if (/saúde/i.test(objectiveName)) return location.replace("/ciencias-da-saude");

    if (isExternalLink(nextPath)) {
      const redirectConfirmation = confirm(
        `Você será redirecionado para uma página externa.\nDeseja continuar?\n\n ${nextPath}`
      );
      if (redirectConfirmation) return location.replace(nextPath);
    }

    if (startBasePath(nextPath)) {
      router.push(removeBasePath(nextPath));
      return close?.();
    }

    if (!startBasePath(nextPath) && nextPath !== "/") {
      router.push(`${config.basePath}${trimSlashes(nextPath)}`);
      return close?.();
    }

    router.push("/painel");
    return close?.();
  };

  useEffect(() => {
    if (isAuth) {
      if (!user.phone || !user.email) setConfirmAccountUpdate(true);
      else goToInitialStep();
    }
  }, [isAuth]);

  const { explanation } = sign === "in" ? dictionary.signin : dictionary.signup;
  const isFetching = user.fetching || isRedirecting;

  if (confirmAccountUpdate) {
    const accountDictionary = dictionary.account;
    return (
      <>
        <Brand className="auth__brand" height={40} />
        <Heading className="text-center" size="sm">
          {accountDictionary.header.title}
        </Heading>
        <WhatsAppUpdateForm
          goToNext={goToInitialStep}
          platformSlug={platformSlug}
          isFetching={isFetching}
        />
        <Explanation html={accountDictionary.explanation.html} />
      </>
    );
  }

  return (
    <>
      <Brand className="auth__brand" height={40} />
      <AuthHeader sign={sign} setSign={setSign} context={context} />
      <AuthSocials isFetching={isFetching} platformSlug={platformSlug} />
      {sign === "in" ? (
        <SignInForm platformSlug={platformSlug} isFetching={isFetching} />
      ) : (
        <SignUpForm platformSlug={platformSlug} isFetching={isFetching} />
      )}
      <Explanation html={explanation.html} />
    </>
  );
};

const Explanation = ({ html = "" }) => (
  <Caption
    as="p"
    className="auth-explanation text-center mt-xl w-100"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default Auth;
