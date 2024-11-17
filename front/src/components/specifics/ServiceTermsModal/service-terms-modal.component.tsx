import type { ServiceTermsModalProps } from "./service-terms-modal.types";

import classNames from "classnames";
import { Modal } from "@andrevantunes/andrevds";
import { useState } from "react";
import { updateSetting } from "@/requests";
import { notifyError, notifySuccess } from "@/helpers/notify.helper";
import { getError } from "@/helpers/errors.helper";
import { Ribo } from "@/components/adapters/Ribo";
import { parse } from "./service-terms-modal.helpers";
import { useRouter } from "next/router";

const ServiceTermsModal = ({
  version,
  className,
  json,
  successText = "Dados salvos com sucesso!",
  ...props
}: ServiceTermsModalProps) => {
  const cn = classNames("service-terms-modal", className);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    updateSetting("accepted-privacy-policy-version", version)
      .then(() => {
        notifySuccess(successText);
        router.reload();
      })
      .catch((data) => notifyError(getError(data)))
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (value: boolean) => setChecked(value);

  return (
    <>
      {show && (
        <Modal closable={false} size="sm" onClose={handleClose} close={() => true} {...props}>
          <div className={cn} data-testid="service-terms-modal">
            <Ribo>{parse(json, checked, loading, handleChange, handleClick)}</Ribo>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ServiceTermsModal;
