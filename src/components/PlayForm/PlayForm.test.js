import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import FormProvider from '../../context/FormContext/FormContext';
import { PlayForm } from './PlayForm';

let mockParticipantsList = ['Vinicius', 'Igor', 'Luciano', 'Ilka'];
let mockPairs = new Map([
  ['Vinicius', 'Igor'],
  ['Igor', 'Luciano'],
  ['Luciano', 'Ilka'],
  ['Ilka', 'Vinicius'],
]);

const mockRaffleParticipants = jest.fn();

jest.mock('../../context/FormContext/FormContextBuilder', () => ({
  FormContextBuilder: () => ({
    participantsList: mockParticipantsList,
    raffleParticipants: mockRaffleParticipants,
    pairs: mockPairs,
  }),
}));

describe('<PlayForm />', () => {
  const renderPlayForm = () =>
    render(
      <FormProvider>
        <PlayForm />
      </FormProvider>,
    );

  const user = userEvent.setup({ delay: null });

  it('quando iniciado o sorteio, o seletor deve conter os nomes de todos os participantes', () => {
    renderPlayForm();

    const selectOptions = screen.getAllByRole('option');

    expect(selectOptions).toHaveLength(mockParticipantsList.length + 1);
  });

  it('quando iniciado o sorteio, a função de sorteio deve ser chamada', () => {
    renderPlayForm();

    expect(mockRaffleParticipants).toHaveBeenCalledTimes(1);
  });

  it('quando o botão Sortear for clicado, o nome do amigo secreto não pode ser o mesmo do sorteador', async () => {
    renderPlayForm();

    const select = screen.getByPlaceholderText('Selecione o seu nome');
    const raffleButton = screen.getByText('Sortear');
    let drawn = screen.queryByRole('alert');

    await user.selectOptions(select, mockParticipantsList[0]);
    await user.click(raffleButton);

    drawn = screen.queryByRole('alert');

    expect(drawn).not.toHaveTextContent(mockParticipantsList[0]);
  });

  it('após 3 segundos, o nome do amigo secreto deve desaparecer', async () => {
    jest.useFakeTimers();

    renderPlayForm();

    const select = screen.getByPlaceholderText('Selecione o seu nome');
    const raffleButton = screen.getByText('Sortear');
    let drawn = screen.queryByRole('alert');

    await user.selectOptions(select, mockParticipantsList[0]);
    await user.click(raffleButton);

    drawn = screen.queryByRole('alert');

    expect(drawn).not.toHaveTextContent(mockParticipantsList[0]);

    act(() => jest.runAllTimers());

    drawn = screen.queryByRole('alert');

    expect(drawn).toBeNull();
  });
});
