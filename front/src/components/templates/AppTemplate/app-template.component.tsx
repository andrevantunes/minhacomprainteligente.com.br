import type { AppTemplateProps } from "./app-template.types";
import { AuthModal, PageTemplate, ProgressBar, CustomerTemplate } from "@/components";
import { Templates } from "@/types";
import classNames from "classnames";
import { useContext, useEffect } from "react";
import { StoreType, useStore } from "@/store";
import { useRouter } from "next/router";
import { AuthModalContext } from "@/contexts/AuthModalContext/auth-modal-context.component";

const AppTemplate = ({
  children,
  component,
  chatSupport = "intercom",
  container = "lg",
  ...props
}: AppTemplateProps) => {
  const [user] = useStore(StoreType.User);
  const router = useRouter();
  const templateList: Record<string, any> = {
    [Templates.Default]: PageTemplate,
    [Templates.Customer]: CustomerTemplate,
  };
  const Component = templateList[component] || PageTemplate;
  const cn = classNames("app-template", {
    [`app-template--${container}`]: container,
  });

  useEffect(() => {
    document.body.dataset.template = component;

    return () => {
      delete document.body.dataset["template"];
      document.body.removeAttribute("data-template");
    };
  }, []);

  const { isOpen, open, close, setSign } = useContext(AuthModalContext);

  useEffect(() => {
    const { sign = "in" } = router.query;
    if (sign === "in" || sign === "up") {
      setSign(sign);
    }
    const showAuthModal = user.guest && user.fetched && router.query.sign;
    if (showAuthModal) open();
  }, [user.fetched]);

  const handleClose = () => {
    if (router?.query?.sign) delete router.query.sign;
    close();
  };

  return (
    <>
      {isOpen && <AuthModal onClose={handleClose} />}
      <ProgressBar />
      <Component className={cn} {...props}>
        {children}
      </Component>
    </>
  );
};

export default AppTemplate;
