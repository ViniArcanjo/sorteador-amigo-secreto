import { render, screen } from '@testing-library/react';
import FormProvider from '../../context/FormContext/FormContext';
import { PlayForm } from './PlayForm';

let mockParticipantsList = ['Vinicius', 'Igor', 'Luciano', 'Ilka'];
let mockError = '';
let mockAddParticipants = jest.fn();

jest.mock('../../context/FormContext/FormContextBuilder', () => ({
  FormContextBuilder: () => ({
    participantsList: mockParticipantsList,
    error: mockError,
    addParticipants: () => mockAddParticipants,
  }),
}));

describe('<PlayForm />', () => {
  const renderPlayForm = () =>
    render(
      <FormProvider>
        <PlayForm />
      </FormProvider>,
    );

  it('quando iniciado o sorteio, o seletor deve conter os nomes de todos os participantes', () => {
    renderPlayForm();

    screen.debug();

    const selectOptions = screen.getAllByRole('option');

    expect(selectOptions).toHaveLength(mockParticipantsList.length);
  });
});
