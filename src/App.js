import style from './App.module.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { AddParticipantsPage } from './pages/AddParticipantsPage/AddParticipantsPage';
import { PlayPage } from './pages/PlayPage/PlayPage';

import FormProvider from './context/FormContext/FormContext';

function App() {
  return (
    <div className={style.App}>
      <Header />
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AddParticipantsPage />} />
            <Route path='/sortear' element={<PlayPage />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </div>
  );
}

export default App;
