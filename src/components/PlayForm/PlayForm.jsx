import style from './PlayForm.module.scss';

import plane from '../../assets/images/aviao.png';
import dice from '../../assets/images/dado.png';

import { useEffect, useState } from 'react';

import { useForm } from '../../context/FormContext/useForm';

export function PlayForm() {
  const { participantsList, raffleParticipants, pairs } = useForm();

  const [drawer, setDrawer] = useState('');
  const [drawn, setDrawn] = useState('');

  useEffect(() => {
    raffleParticipants(participantsList);
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();

    setDrawn(pairs.get(drawer));

    setTimeout(() => {
      setDrawn('');
    }, 3000);
  }

  return (
    <div className={style.content_wrapper}>
      <form className={style.form_wrapper} onSubmit={handleFormSubmit}>
        <h1>Quem vai tirar o papelzinho?</h1>
        <select
          required
          name='participants-selector'
          id='participants-selector'
          placeholder='Selecione o seu nome'
          onChange={(e) => {
            setDrawer(e.target.value);
          }}
        >
          <option disabled selected>
            Selecione o seu nome
          </option>
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
        {drawn && <span role='alert'>{drawn}</span>}
        <p>Clique em sortear para ver quem é o seu amigo secreto!</p>
        <div>
          <img src={dice} />
          <button type='submit'>Sortear</button>
        </div>
      </form>
      <img src={plane} />
    </div>
  );
}
