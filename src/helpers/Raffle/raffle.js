import shuffle from 'just-shuffle';

export function raffle(participantsList) {
  const allParticipants = participantsList.length;
  const shuffled = shuffle(participantsList);

  const pairs = new Map();

  for (let index = 0; index < allParticipants; index++) {
    const drawnIndex = index === allParticipants - 1 ? 0 : index + 1;

    pairs.set(shuffled[index], shuffled[drawnIndex]);
  }

  return pairs;
}
