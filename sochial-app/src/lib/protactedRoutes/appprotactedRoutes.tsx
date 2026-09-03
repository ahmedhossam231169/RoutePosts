import { useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../../components/context/authcontext";




export default function AppProtactedRoutes({ children }: { children: ReactNode }) {
const { token }=useContext(authContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
    navigate("/auth/login")
  }
  },[token])
  return (
    <>
    {children}
    
    </>
  )
}
