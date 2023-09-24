import React from 'react';
import { CreateModal } from './style';

const Modal = ({ children, show, onCloseModal, backgroundFilter = false }) => {
  if (!show) return null;

  return (
    <CreateModal onClick={onCloseModal} backgroundFilter={backgroundFilter}>
      {children}
    </CreateModal>
  );
};

export default Modal;
