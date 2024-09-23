import { createContext, useContext, useEffect, useState } from "react";

const CountContext = createContext();

export const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  let start = Date.now();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - start;
      const newCount = Math.min(Math.floor(elapsed / 30), 100);
      setCount(newCount);
    }, 30);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
