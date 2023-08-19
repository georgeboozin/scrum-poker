import { useState, useCallback } from "react";

export function useForm() {
  const [name, setName] = useState("");
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setName(value);
    },
    []
  );

  return {
    name,
    handleNameChange,
  };
}
