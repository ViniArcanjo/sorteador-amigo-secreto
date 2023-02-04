import { createContext, useState } from 'react';
import { FormContextBuilder } from './FormContextBuilder';

export const FormContext = createContext({});

export default function FormProvider({ children }) {
  const participants = FormContextBuilder(useState([]));

  return (
    <FormContext.Provider value={participants}>{children}</FormContext.Provider>
  );
}
