import style from './App.module.scss';
import { Header } from './components/Header/Header';
import { Form } from './components/Form/Form';
import Card from './components/Card';
import FormProvider from './context/FormContext/FormContext';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className={style.App}>
      <Header />
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Card>
                  <Form />
                </Card>
              }
            />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </div>
  );
}

export default App;
