import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages'
import Login from './pages/login/Login'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store/store'
import './styles/App.scss'
import Signup from './pages/signup/Signup'
import ProtectedRoutes from './ProtectedRoutes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
