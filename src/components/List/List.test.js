import { render, screen } from '@testing-library/react';

import { List } from './List';
import { FormContext } from '../../context/FormContext/FormContext';

describe('<List />', () => {
  let mockedParticipantsList = [];
  let mockedError = '';

  function renderList() {
    return render(
      <FormContext.Provider
        value={{
          participantsList: mockedParticipantsList,
          error: mockedError,
          addParticipant: jest.fn(),
        }}
      >
        <List />
      </FormContext.Provider>,
    );
  }

  it('quando iniciado, a lista deve estar vazia', async () => {
    renderList();

    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });

  it('quando a lista não estiver vazia, deve apresentar os elementos em tela', async () => {
    mockedParticipantsList = ['Harry', 'Ron'];
    renderList();

    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(2);
  });
});
