import { useState } from "react";

export const useSessionStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItemSession = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
    setValue(value);
  };

  const getItemSession = (key: string) => {
    const value = sessionStorage.getItem(key);
    setValue(value);
    return value;
  };

  const removeItemSession = (key: string) => {
    sessionStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItemSession, getItemSession, removeItemSession };
};
