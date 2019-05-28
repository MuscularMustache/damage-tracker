import React from 'react';
import '../styles/modal.scss';


const Modal = props => {
  return (
    <div className={`${props.class} modal`}>
      <div className="modal-bg" onClick={props.toggleModal}></div>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
