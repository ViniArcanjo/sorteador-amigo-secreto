import shuffle from 'just-shuffle';

import { useState } from 'react';

export const FormContextBuilder = ([
  participantsList,
  setParticipantsList,
  pairs,
  setPairs,
]) => {
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

  function raffle(participantsList) {
    const allParticipants = participantsList.length;
    const shuffled = shuffle(participantsList);

    const pairs = new Map();

    for (let index = 0; index < allParticipants; index++) {
      const drawnIndex = index === allParticipants - 1 ? 0 : index + 1;

      pairs.set(shuffled[index], shuffled[drawnIndex]);
    }

    return pairs;
  }

  return {
    participantsList,
    pairs,
    error,
    addParticipant: (participant) =>
      setParticipantsList(add(participantsList, participant)),
    raffleParticipants: (list) => setPairs(raffle(list)),
  };
};
