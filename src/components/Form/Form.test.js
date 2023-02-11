import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { FormContext } from '../../context/FormContext/FormContext';
import FormProvider from '../../context/FormContext/FormContext';
import { Form } from './Form';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return { useNavigate: () => mockUseNavigate };
});

describe('<Form />', () => {
  const user = userEvent.setup({ delay: null });

  function renderForm() {
    return render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );
  }

  it('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    renderForm();

    const input = screen.getByPlaceholderText(
      'Insira o nome dos participantes',
    );
    const button = screen.getAllByRole('button');

    expect(input).toBeInTheDocument();
    expect(button[0]).toBeDisabled;
  });

  it('quando o input estiver preenchido, deve adicionar o participante indicado no input', async () => {
    renderForm();

    const input = screen.getByPlaceholderText(
      'Insira o nome dos participantes',
    );
    const button = screen.getAllByRole('button');

    await user.type(input, 'Vinicius');

    expect(input).toHaveValue('Vinicius');
    expect(button[0]).not.toBeDisabled;

    await user.click(button[0]);

    expect(input).toHaveFocus();
    expect(input).toHaveValue('');
  });

  it('quando tentar adicionar um participante que já existe, uma mensagem de erro deve ser exibida', async () => {
    renderForm();

    const input = screen.getByPlaceholderText(
      'Insira o nome dos participantes',
    );
    const button = screen.getAllByRole('button');

    await user.type(input, 'Vinicius');
    await user.click(button[0]);
    await user.type(input, 'Vinicius');
    await user.click(button[0]);

    const errorMessage = screen.getByRole('alert');

    expect(errorMessage.textContent).toBe(
      'Nomes duplicados não são permitios!',
    );
  });

  it('quando disparada a mensagem de erro, deve ficar na tela por apenas 2s', async () => {
    jest.useFakeTimers();

    renderForm();

    const input = screen.getByPlaceholderText(
      'Insira o nome dos participantes',
    );
    const button = screen.getAllByRole('button');

    await user.type(input, 'Vinicius');
    await user.click(button[0]);
    await user.type(input, 'Vinicius');
    await user.click(button[0]);

    let errorMessage = screen.queryByRole('alert');

    expect(errorMessage).toBeInTheDocument();

    act(() => jest.runAllTimers());

    errorMessage = screen.queryByRole('alert');

    expect(errorMessage).toBeNull();
  });

  it('quando o tamanho da lista de participantes for menor que 3, o botão de Iniciar Brincadeira deve estar desabilitado', async () => {
    renderForm();

    const input = screen.getByPlaceholderText(
      'Insira o nome dos participantes',
    );
    const button = screen.getAllByRole('button');

    expect(button[1]).toBeDisabled();

    await user.type(input, 'Vinicuius');
    await user.click(button[0]);
    await user.type(input, 'Igor');
    await user.click(button[0]);
    await user.type(input, 'Luciano');
    await user.click(button[0]);
    await user.type(input, 'Ilka');
    await user.click(button[0]);

    expect(button[1]).not.toBeDisabled();
  });

  it('quando o tamanho da lista de participantes for maior ou igual a 3, o botão de Iniciar Brincadeira deve estar habilitado', async () => {
    const participantsList = ['Vinicius', 'Igor', 'Luciano', 'Ilka'];

    render(
      <FormContext.Provider value={{ participantsList }}>
        <Form />;
      </FormContext.Provider>,
    );

    const button = screen.getAllByRole('button');

    expect(button[1]).not.toBeDisabled();
  });

  it('quando habilitado, o botão de Iniciar Brincadeira deve navegar até a página da bricadeira', async () => {
    const participantsList = ['Vinicius', 'Igor', 'Luciano', 'Ilka'];

    render(
      <FormContext.Provider value={{ participantsList }}>
        <Form />;
      </FormContext.Provider>,
    );

    const button = screen.getAllByRole('button');

    await user.click(button[1]);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/sortear');
  });
});
