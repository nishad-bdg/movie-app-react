import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className='container-fluid login d-flex justify-content-center align-items-center'>
      <form
        className='login-form col-12 col-sm-10 col-lg-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Sign In</h1>
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
              className='form-control'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            {errors.password && <p className='error'>This field is required</p>}
          </label>
          <button type='submit' className='btn btn-danger'>
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
