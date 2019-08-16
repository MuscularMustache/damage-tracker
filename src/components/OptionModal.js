import React from 'react';
import Modal from './Modal';
import '../styles/optionmodal.scss';

const OptionModal = props => {
  const {show, activeModal, modalName} = props.modalState;
  if (!show || activeModal !== modalName) {
    return <div />
  }

  const { activeEnemy, activeEnemy: { name, health, healthHistory} } = props;
  const isDM = activeEnemy.maxHealth !== 'noHealth';

  const history = () => {
    if (healthHistory.length) {
      return (
        <p className="health-history">
          <span>{isDM ? activeEnemy.maxHealth : 0}</span>
          {healthHistory.map((health, index) => {
            let damage = isDM ? health.includes('-') : health.includes('+');
            return <span key={activeEnemy.id-index} className={damage ? 'damage' : 'healed'}> {health}</span>
          })}
        </p>
      );
    } else {
      return <p>This boii aint even got hit yet</p>;
    }
  }

  return (
    <Modal class="option-modal" toggleModal={props.toggleModal}>
      <h2>{name}</h2>
      <h3>has taken {health} damage</h3>
      <div>
        <strong>Health History</strong>
        {history()}
      </div>
      <div className="buttons">
        <button
          className={activeEnemy.alive ? 'icon-text-button alive' : 'icon-text-button dead'}
          onClick={() => props.toggleDeath(activeEnemy.id, !activeEnemy.alive)}
          >
          <i className="material-icons icon-button">{activeEnemy.alive ? 'thumb_down' : 'thumb_up'}</i>
          <span>{activeEnemy.alive ? 'Oh you know he dead now' : 'HAZZAH! I\'m back!'}</span>
        </button>
        <button className="icon-text-button" onClick={() => props.deleteEnemy(activeEnemy.id)}>
          <i className="material-icons icon-button">delete</i>
          <span>Erase me from existance!</span>
        </button>
      </div>
    </Modal>
  );
}


export default OptionModal;
