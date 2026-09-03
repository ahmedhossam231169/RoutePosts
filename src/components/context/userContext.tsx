import React, { createContext, useContext, useEffect, useState } from "react"
import type { Iuser } from "../../types/user"
import { getMyProfile } from "../../services/myProfile.service"
import { authContext } from "./authcontext"
type userContextType ={
userData : Iuser | null

}
export const userContext = createContext<userContextType>({ userData: null })
export default function userContextProvider({ children }: { children: React.ReactNode }) {

const { token, setToken } = useContext(authContext)
const [userData, setUserData] = useState<Iuser | null>(null)
 async function getMyProfilePage() {
  try {
    const { data } = await getMyProfile()
    setUserData(data.data.user)
  } catch (error: any) {
    console.log(error)
    setUserData(null)
    if (error?.response?.status === 401) {
      localStorage.removeItem("userToken")
      setToken(null)
    }
  }
}
useEffect(() => {
  if (!token) {
    setUserData(null)
    return
  }
  getMyProfilePage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token])
  return (
    <>
      <userContext.Provider value={{userData}}>
        {children}

      </userContext.Provider>

    </>
  )
}
