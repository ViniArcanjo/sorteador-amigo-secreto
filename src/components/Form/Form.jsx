import style from './Form.module.scss';

import { List } from '../List/List';
import person_add from '../../assets/images/person_add.png';
import bags from '../../assets/images/sacolas.png';

import { useRef, useState } from 'react';
import { useForm } from '../../context/FormContext/useForm';
import { useNavigate } from 'react-router-dom';

export function Form() {
  const navigate = useNavigate();

  const { participantsList, addParticipant, error } = useForm();

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleAddButtonClick(e) {
    e.preventDefault();

    inputRef.current?.focus();

    addParticipant(inputValue);

    setInputValue('');
  }

  function handleStartButtonClick() {
    navigate('/sortear');
  }

  return (
    <div className={style.content_wrapper}>
      <form className={style.form_wrapper}>
        <h1>Vamos Começar!</h1>
        <div>
          <img src={person_add} />
          <input
            type='text'
            placeholder='Insira o nome dos participantes'
            value={inputValue}
            ref={inputRef}
            onInput={handleInputChange}
          />
        </div>
        <button disabled={!inputValue} onClick={handleAddButtonClick}>
          Adicionar
        </button>
        {error && <p role='alert'>{error}</p>}
      </form>
      <List />
      <button
        disabled={!(participantsList.length >= 3)}
        onClick={handleStartButtonClick}
      >
        Iniciar Brincadeira!
      </button>
      <img src={bags} />
    </div>
  );
}
