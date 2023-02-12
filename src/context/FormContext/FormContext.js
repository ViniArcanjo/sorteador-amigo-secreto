import { createContext, useState } from 'react';
import { FormContextBuilder } from './FormContextBuilder';

export const FormContext = createContext({});

export default function FormProvider({ children }) {
  const [participantsList, setParticipantsList] = useState([]);
  const [pairs, setPairs] = useState([]);

  const participants = FormContextBuilder([
    participantsList,
    setParticipantsList,
    pairs,
    setPairs,
  ]);

  return (
    <FormContext.Provider value={participants}>{children}</FormContext.Provider>
  );
}
