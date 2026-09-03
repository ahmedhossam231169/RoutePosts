import React, { createContext, useEffect, useState } from "react"
import type { Iuser } from "../../types/user"
import { getMyProfile } from "../../services/myProfile.service"
type userContextType ={
userData : Iuser | null

}
export const userContext = createContext<userContextType>({ userData: null })
export default function userContextProvider({ children }: { children: React.ReactNode }) {

const [userData, setUserData] = useState<Iuser | null>(null)
 async function getMyProfilePage() {
  const { data } = await getMyProfile()
  const User = data.data.user
  setUserData(User)
  console.log(User)
}
useEffect(() => {
  getMyProfilePage()

}, [])
  return (
    <>
      <userContext.Provider value={{userData}}>
        {children}

      </userContext.Provider>

    </>
  )
}
