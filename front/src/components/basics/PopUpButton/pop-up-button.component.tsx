import type { PopUpButtonProps } from "./pop-up-button.types";
import type { ModalChildProps } from "@andrevantunes/andrevds";

import classNames from "classnames";
import { Button, ModalContent, Ribo } from "@/components";
import { Modal, ModalSizes } from "@andrevantunes/andrevds";
// import * as controllersList from "@/controllers";

const PopUpButton = ({ children, className, popUp, ...props }: PopUpButtonProps) => {
  const cn = classNames("pop-up-button", className);

  const {
    size = ModalSizes.Small,
    backgroundColor,
    // buttons,
    color,
    className: popUpClassName,
    children: popUpChildren,
    ...popUpProps
  } = popUp || {};

  const PopUpContent = ({}: ModalChildProps) => {
    // const buttonsList = !Array.isArray(buttons)
    //   ? undefined
    //   : buttons.map(({ action, ...btn }) => {
    //       if (action === "close") btn.onClick = () => close();
    //       // @ts-ignore
    //       if (action && controllersList[action]) {
    //         btn.onClick = () => {
    //           // @ts-ignore
    //           controllersList[action]();
    //           close();
    //         };
    //       }
    //       return btn;
    //     });
    return (
      <ModalContent className={classNames("pop-up-button__modal", popUpClassName)} {...popUpProps}>
        <Ribo>{popUpChildren}</Ribo>
        {/*{buttonsList && <ButtonList className="pop-up-button__modal-buttons" list={buttonsList} />}*/}
      </ModalContent>
    );
  };

  const handleClick = () => Modal.open(PopUpContent, { size, style: { backgroundColor, color } });

  return (
    <Button
      data-testid="open-pop-up-button"
      className={cn}
      {...props}
      onClick={handleClick}
      disabled={!popUp}
    >
      {children}
    </Button>
  );
};

export default PopUpButton;
