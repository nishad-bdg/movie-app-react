import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../../store/loginSlice'

type Inputs = {
  email: string
  password: string
  confirmPassword: string
}

function Signup() {
  const dispatch = useAppDispatch()
  let history = useNavigate()

  // useEffect(() => {
  //   isAuthenticated && history('/')
  // }, [history])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(signupUser(data))
  }

  return (
    <div className='container-fluid login d-flex justify-content-center align-items-center'>
      <form
        className='login-form col-12 col-sm-10 col-lg-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='mb-2'>Sign up</h2>
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

          <label>
            <input
              type='password'
              className='form-control mb-2'
              placeholder='Confirm Password'
              {...register('confirmPassword', { required: true })}
            />
            {errors.confirmPassword && <p className='error'>This field is required</p>}
          </label>
          <button type='submit' className='btn btn-danger'>
            Sign up
          </button>
          <p className='login-footer mt-2'>
            Already have an account <Link to='/login'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
