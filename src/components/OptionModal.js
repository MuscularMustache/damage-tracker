import React from 'react';
import Modal from './Modal';
// import '../styles/optionmodal.scss';

const OptionModal = props => {
  const {show, activeModal, modalName} = props.modalState;
  if (!show || activeModal !== modalName) {
    return <div />
  }

  const { activeEnemy, activeEnemy: { name, health, healthHistory} } = props;

  const history = healthHistory.map((health, index) => {
    return <span key={activeEnemy.id-index}> {health}</span>
  })

  return (
    <Modal class="option-modal" toggleModal={props.toggleModal}>
      <div>
        <h3>Option Modal</h3>
        <h3>{name} has taken {health} damage</h3>
        <i className="material-icons icon-button death" onClick={() => props.toggleDeath(activeEnemy.id, !activeEnemy.alive)}>thumb_down</i>
        <i className="material-icons icon-button" onClick={() => props.deleteEnemy(activeEnemy.id)}>delete</i>
        <p>
          <span>0</span>
          {history}
        </p>
      </div>
    </Modal>
  );
}

export default OptionModal;
