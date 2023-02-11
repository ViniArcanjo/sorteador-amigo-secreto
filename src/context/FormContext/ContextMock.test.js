import { render, screen } from '@testing-library/react';
import FormProvider from './FormContext';

import { Form } from '../../components/Form/Form';

let mockParticipantsList = [];
let mockError = '';
const mockAddParticipants = jest.fn();

const mockUseNavigate = jest.fn();

jest.mock('./FormContextBuilder', () => {
  return {
    FormContextBuilder: () => ({
      participantsList: mockParticipantsList,
      error: mockError,
      addParticipants: () => mockAddParticipants,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockUseNavigate,
  };
});

describe('<Form /> in context', () => {
  it('deve iniciar o botão de adicionar participantes como desabilitado', () => {
    render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );

    const btns = screen.getAllByRole('button');

    expect(btns[0]).toBeDisabled();
  });

  it('deve estar com o botão de iniciar brinacdeira habilitado', () => {
    mockParticipantsList = ['Vinicius', 'Igor', 'Luciano'];

    render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );

    const btns = screen.getAllByRole('button');

    expect(btns[1]).not.toBeDisabled();
  });

  it('deve iniciar sem erro na tela', () => {
    render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );

    expect(screen.queryByText('Isso é um erro')).toBeNull;
  });

  it('deve identificar o erro na tela', () => {
    mockError = ['Isso é um erro'];

    render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );

    expect(screen.getByText('Isso é um erro')).toBeInTheDocument;
  });
});
