import style from './PlayForm.module.scss';

import plane from '../../assets/images/aviao.png';
import dice from '../../assets/images/dado.png';

// import {  useState } from 'react';

// import { useNavigate } from 'react-router-dom';

import { useForm } from '../../context/FormContext/useForm';

export function PlayForm() {
  // const navigate = useNavigate();

  const { participantsList } = useForm();

  // function handleRaffleButtonClick() {
  //   return;
  // }

  return (
    <div className={style.content_wrapper}>
      <form className={style.form_wrapper}>
        <h1>Quem vai tirar o papelzinho?</h1>
        <div>
          <img src={dice} />
          <select name='participants-selector' id='participants-selector'>
            {participantsList?.map((participant) => (
              <option
                key={participantsList.indexOf(participant)}
                value={participant}
                role='option'
              >
                {participant}
              </option>
            ))}
          </select>
        </div>
        <button>Sortear</button>
      </form>
      <img src={plane} />
    </div>
  );
}
