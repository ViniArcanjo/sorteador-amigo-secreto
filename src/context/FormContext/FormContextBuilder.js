import { useState } from 'react';

export const FormContextBuilder = ([participantsList, setParticipantsList]) => {
  const [error, setError] = useState('');

  function add(list, participant) {
    const newList = [...list];

    if (newList.includes(participant)) {
      setError('Nomes duplicados não são permitios!');

      setTimeout(() => {
        setError('');
      }, 2000);

      return newList;
    } else {
      return [...newList, participant];
    }
  }

  return {
    participantsList,
    error,
    addParticipant: (participant) =>
      setParticipantsList(add(participantsList, participant)),
  };
};
