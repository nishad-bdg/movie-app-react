import { Outlet } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from "./services/authenticationService"

const useAuth = () => {
  const user = { loggedIn: isAuthenticated() }
  return user && user.loggedIn
}


const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate replace to='/login'/>
}

export default ProtectedRoutes
