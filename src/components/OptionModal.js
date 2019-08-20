import React from 'react';
import Modal from './Modal';
// import ConditionSelect from './ConditionSelect';
import '../styles/optionmodal.scss';
import Select from 'react-select';

const OptionModal = props => {
  const {show, activeModal, modalName} = props.modalState;
  if (!show || activeModal !== modalName) {
    return <div />
  }

  const { activeEnemy, activeEnemy: { name, damage, damageHistory} } = props;
  const isDM = activeEnemy.maxHealth !== 'noHealth';

  const history = () => {
    if (damageHistory.length) {
      return (
        <p className="damage-history">
          <span>{isDM ? activeEnemy.maxHealth : 0}</span>
          {damageHistory.map((damage, index) => {
            let damaged = isDM ? damage.includes('-') : damage.includes('+');
            return <span key={activeEnemy.id-index} className={damaged ? 'damage' : 'healed'}> {damage}</span>
          })}
        </p>
      );
    } else {
      return <p>This boii aint even got hit yet</p>;
    }
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#6b77e0',
    })
  }

  const effects = [
    { idx: 0, value: 'blinded', label: 'Blinded', icon: 'fas fa-eye-slash' },
    { idx: 1, value: 'bleeding', label: 'Bleeding', icon: 'fas fa-tint' },
    { idx: 2, value: 'burning', label: 'Burning', icon: 'fas fa-fire' },
    { idx: 3, value: 'charmed', label: 'Charmed', icon: 'fas fa-heart' },
    { idx: 4, value: 'deafened', label: 'Deafened', icon: 'fas fa-deaf' },
    { idx: 5, value: 'exhausted', label: 'Exhausted', icon: 'fas fa-bed' },
    { idx: 6, value: 'frightened', label: 'Frightened', icon: 'fas fa-exclamation-triangle' },
    { idx: 7, value: 'grappled', label: 'Grappled', icon: 'fas fa-lock' },
    { idx: 8, value: 'incapacitated', label: 'Incapacitated', icon: 'fas fa-wheelchair' },
    { idx: 9, value: 'invisible', label: 'Invisible', icon: 'fas fa-low-vision' },
    { idx: 10, value: 'other', label: 'Other', icon: 'fas fa-dizzy' },
    { idx: 11, value: 'paralyzed', label: 'Paralyzed', icon: 'fas fa-dizzy' },
    { idx: 12, value: 'petrified', label: 'Petrified', icon: 'fas fa-user-slash' },
    { idx: 13, value: 'poisoned', label: 'Poisoned', icon: 'fas fa-skull-crossbones' },
    { idx: 14, value: 'prone', label: 'Prone', icon: 'fas fa-bed' },
    { idx: 15, value: 'restrained', label: 'Restrained', icon: 'fas fa-lock' },
    { idx: 16, value: 'stunned', label: 'Stunned', icon: 'fas fa-star' },
    { idx: 17, value: 'unconscious', label: 'Unconscious', icon: 'fas fa-skull' }
  ];

  let activeEffects;
  if (activeEnemy.statusEffects && activeEnemy.statusEffects.length) {
    activeEffects = activeEnemy.statusEffects.map(eft => effects[eft.idx])
  } else {
    activeEffects = null;
  }

  return (
    <Modal class="option-modal" toggleModal={props.toggleModal}>
      <h2>{name}</h2>
      <h3>has taken {damage} damage</h3>
      <div>
        <strong>Damage History</strong>
        {history()}
      </div>
      <div className="status-effects">
        <Select
          styles={customStyles}
          options={effects}
          closeMenuOnSelect={true}
          isMulti
          placeholder="Select Status Effects"
          onChange={(effects) => props.statusSelect(effects, activeEnemy.id)}
          defaultValue={activeEffects}
        />
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
