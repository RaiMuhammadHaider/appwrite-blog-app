import React from 'react'
import { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
const AuthLayout = ({children , authentication = true}) => {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [Loader , setLoader] = useState(true)
    useEffect(()=>{
        if (authentication && authStatus !== authentication){
            navigate('/login')
        } else  if (!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)

    }, [authentication, authStatus, navigate])

  return Loader ? <div>Loading...</div> : (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          {children}
        </div>
    </div>
  )
}

export default AuthLayout