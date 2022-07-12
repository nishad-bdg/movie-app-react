import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../services/authenticationService'
import { Notyf } from 'notyf'

import {
  authenticateUser,
  clearState,
  selectAuthentication
} from '../../store/loginSlice'
import { useSelector } from 'react-redux'

type Inputs = {
  email: string
  password: string
}

function Login() {
  const dispatch = useAppDispatch()
  const history = useNavigate()

  const notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top'
    }
  })

  const { isProcessingRequest, errorMessage, accessToken } =
    useSelector(selectAuthentication)

  useEffect(() => {
    if (isAuthenticated()) {
      history('/')
    }
    return () => {
      dispatch(clearState())
    }
  }, [history])

  useEffect(() => {
    if (errorMessage !== '') {
      notyf.error(errorMessage)
    }

    if (accessToken) {
      dispatch(clearState())
      history('/')
    }
  }, [errorMessage, accessToken])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(authenticateUser(data))
  }

  return (
    <div className='container-fluid login d-flex justify-content-center align-items-center'>
      <form
        className='login-form col-12 col-sm-10 col-lg-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='mb-2'>Sign In</h2>
        <div className='d-flex flex-column'>
          <label>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              {...register('email', { required: true })}
            />
            {errors.email && <p className='error'>This field is required</p>}
          </label>

          <label>
            <input
              type='password'
              className='form-control my-2'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            {errors.password && <p className='error'>This field is required</p>}
          </label>
          <button type='submit' className='btn btn-danger'>
            {isProcessingRequest ? 'Loading' : 'Sign In'}
          </button>
          <p className='login-footer mt-2'>
            Don't have an account <Link to='/signup'>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
