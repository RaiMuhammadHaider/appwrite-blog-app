import React , {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { Logo , Input , Button } from './index'
import  { useForm } from 'react-hook-form'
import AuthService from '../lib/Auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
const Login = () => {   
const  dispatch = useDispatch()
const navigate = useNavigate()
const { register , handleSubmit } = useForm()
const  [error , setError] = useState("")
const login = async (data) => {
    try {
        const response = await AuthService.login(data)
        if (response){
             const user = await AuthService.currentUser()
            if (user) {
                dispatch(login(user))
                navigate("/")
            }
        }
    } catch (error) {
        setError(error.message)
        
    }
    
}
  return (
    <div>
        <div className='min-h-screen flex flex-col justify-center  py-12 sm:px-6 lg:px-8 bg-gray-50'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Logo className="mx-auto h-12 w-auto"/>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
        <p className='mt-2 text-center text-sm text-gray-600 max-w'>
            {error && <span className='text-red-500'>{error}</span>}
        </p>
        <p className='mt-2 text-center text-sm text-gray-600 max-w'>
            Or
            <Link to="/signup" className='font-medium text-indigo-600 hover:text-indigo-500'> sign up</Link>
        </p>
    </div>
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
    <form  className='space-y-6' onSubmit={handleSubmit(login)}>
     
     <div className='space-y-6'>
        <Input label = 'Email: ' type = 'email' placeholder = 'Enter your email' {...register('email', {
            required: true,
            validate: {
                matchPattern: v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v) || "Invalid email address"

            }
        })} />
        <div className='mt-1'>
            <Input label = 'Password: ' type = 'password' placeholder = 'Enter your password' {...register('password', {
                required: true,
                minLength: {value: 6, message: "Password must be at least 6 characters long"}
            })} />
        </div>
        <div className='flex items-center justify-between'>
            <Button type = 'submit' className = 'w-full'>Login</Button>
        </div>
     </div>
    </form> 

        </div>
    </div>
</div>
    </div>
  )
}

export default Login