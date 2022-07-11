import { Outlet } from "react-router-dom"
import Login from "./pages/login/Login"
import { isAuthenticated } from "./services/authenticationService"

const useAuth = () => {
  const user = { loggedIn: isAuthenticated() }
  return user && user.loggedIn
}


const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoutes
