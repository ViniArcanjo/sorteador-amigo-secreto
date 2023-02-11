import { render } from '@testing-library/react';

import FormProvider from '../../context/FormContext/FormContext';
import { StartConfigPage } from './StartConfigPage';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockUseNavigate,
  };
});

describe('<StartConfigPage />', () => {
  it('deve renderizar todos os componentes na ordem correta', () => {
    const { container } = render(
      <FormProvider>
        <StartConfigPage />
      </FormProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
