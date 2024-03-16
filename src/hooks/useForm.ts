import { useState, ChangeEvent } from "react";

type FormValues = Record<string, string>;

type UseFormReturnType = [
  FormValues,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void
];

const useForm = (initialValues: FormValues): UseFormReturnType => {
  const [values, setValues] = useState<FormValues>(initialValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return [values, onChange, resetForm];
};

export default useForm;
