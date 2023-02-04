import style from './List.module.scss';

import { useForm } from '../../context/FormContext/useForm';

export function List() {
  const { participantsList } = useForm();

  return (
    <ul className={style.list_wrapper}>
      {participantsList.length > 0 &&
        participantsList.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
    </ul>
  );
}
