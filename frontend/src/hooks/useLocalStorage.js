// hooks/useLocalStorage.js
import { useCallback } from "react";

const useLocalStorage = (storageType = "session") => {
  const storage = storageType === "session" ? sessionStorage : localStorage;

  const getItem = useCallback((key) => {
    return storage.getItem(key);
  }, [storage]);

  const setItem = useCallback((key, value) => {
    storage.setItem(key, value);
  }, [storage]);

  const removeItem = useCallback((key) => {
    storage.removeItem(key);
  }, [storage]);

  return { getItem, setItem, removeItem };
};

export default useLocalStorage;