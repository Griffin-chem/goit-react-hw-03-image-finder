import React from "react";

import { Overlay, ModalCSS } from "./styledModal";

const Modal = ({ source, onClick, onKeyDown }) => {
  return (
    <Overlay onClick={onClick}>
      <ModalCSS>
        <img src={source} alt="" />
      </ModalCSS>
    </Overlay>
  );
};

export { Modal };
