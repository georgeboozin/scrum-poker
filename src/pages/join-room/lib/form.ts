import { useState, useCallback } from "react";

interface Values {
  name: string;
}

export function useForm() {
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
    (callback: (values: Values) => void) => (e: React.SyntheticEvent) => {
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
