import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const updateField = (name, value) => setForm(f => ({ ...f, [name]: value }));
  const setFieldError = (name, error) => setErrors(e => ({ ...e, [name]: error }));
  return (
    <FormContext.Provider value={{ form, setForm, errors, setErrors, updateField, setFieldError }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
