import React from 'react';
import Modal from './Modal';
import effects from '../status-data';
import '../styles/optionmodal.scss';
import Select from 'react-select';
import chroma from 'chroma-js';

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
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
        color: isDisabled ? '#ccc' : isSelected ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

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
