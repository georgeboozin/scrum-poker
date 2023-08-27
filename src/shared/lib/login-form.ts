import { useState, useCallback } from "react";

type Values = {
  name: string;
};

type Callback = (values: Values) => void;

export function useLoginForm() {
  const [values, setValues] = useState<Values>({
    name: "",
  });

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, name: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (callback: Callback) => (e: React.SyntheticEvent) => {
      e.preventDefault();
      callback(values);
    },
    [values]
  );

  return {
    values,
    handleNameChange,
    handleSubmit,
  };
}
