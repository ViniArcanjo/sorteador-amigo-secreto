import { raffle } from './raffle';

describe('Dado um Sorteio', () => {
  it('um participante não pode tirar seu próprio nome', () => {
    const participants = [
      'Vinicius',
      'Igor',
      'Luciano',
      'Ilka',
      'Luana',
      'Mauro',
      'Viviam',
    ];

    const pairs = raffle(participants);

    participants.forEach((participant) => {
      const drawn = pairs.get(participant);
      expect(drawn).not.toEqual(participant);
    });
  });
});
