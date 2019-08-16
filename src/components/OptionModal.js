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

  const effects = [
    { idx: 0, value: 'blinded', label: 'Blinded' },
    { idx: 1, value: 'charmed', label: 'Charmed' },
    { idx: 2, value: 'deafened', label: 'Deafened' },
    { idx: 3, value: 'exhausted', label: 'Exhausted' },
    { idx: 4, value: 'frightened', label: 'Frightened' },
    { idx: 5, value: 'grappled', label: 'Grappled' },
    { idx: 6, value: 'incapacitated', label: 'Incapacitated' },
    { idx: 7, value: 'invisible', label: 'Invisible' },
    { idx: 8, value: 'paralyzed', label: 'Paralyzed' },
    { idx: 9, value: 'petrified', label: 'Petrified' },
    { idx: 10, value: 'poisoned', label: 'Poisoned' },
    { idx: 11, value: 'prone', label: 'Prone' },
    { idx: 12, value: 'restrained', label: 'Restrained' },
    { idx: 13, value: 'stunned', label: 'Stunned' },
    { idx: 14, value: 'unconscious', label: 'Unconscious' }
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
