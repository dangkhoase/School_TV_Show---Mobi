import { createContext, ReactNode, useContext } from 'react';
import { useStorageState } from './useStorageState';
 
const AuthContext = createContext({});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [[, user], setUser] = useStorageState('user');
  const [[, accessToken], ,] = useStorageState('token');



  return (
    <AuthContext.Provider value={{ user, setUser, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
