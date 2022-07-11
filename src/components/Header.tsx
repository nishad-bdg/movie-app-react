import { Link } from 'react-router-dom'

interface Props {
  isAuthenticated: boolean
  logout: () => void
}

function Header({ isAuthenticated, logout }: Props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Movie App
        </Link>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav '>
            {!isAuthenticated ? (
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
              </li>
            ) : (
              <li className='nav-item'>
                <button className='btn btn-danger' onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Header
