import type React from "react";
import { createContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const authContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
})
export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  
  const [token, setToken] = useState<string | null>(localStorage.getItem("userToken"))

  
  return (
    <>
    <authContext.Provider value={{token,setToken}}>

      {children}

    </authContext.Provider>
    
    </>
  )
}
