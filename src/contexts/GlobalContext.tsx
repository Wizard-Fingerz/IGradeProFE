import { createContext, useState, ReactNode, FC, useEffect } from "react";

interface GlobalContextProps {
  user: User | null;
  setUser: (user: User) => void;
  loading: boolean; // Add loading to indicate data is being fetched
}

interface User {
  id: number;
  name: string;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Initialize with data from localStorage
    }
    setLoading(false); // Data loading is complete
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
