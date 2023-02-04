import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormProvider from '../../context/FormContext/FormContext';

import { Form } from './Form';

describe('<Form />', () => {
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
    const user = userEvent.setup();

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
    const user = userEvent.setup();

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

  it('quando disparada a mensagem de erro, deve ficar na tela por apenas 1s', async () => {
    const user = userEvent.setup({ delay: null });

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

    setTimeout(() => {
      errorMessage = screen.queryByRole('alert');
    }, 2000);

    setTimeout(() => {
      expect(errorMessage).toBeNull();
    }, 3000);
  });
});
