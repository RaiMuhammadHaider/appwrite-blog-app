import React from 'react'
import { useId } from 'react'
import { forwardRef } from 'react'
const Input = forwardRef(function Input({
    label,
    className = "",
    type = 'text',


    ...props
}, ref) {
    const Id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={Id} className='inline-block mb-1 pl-1'>

                {label}
            </label>}
            <input type={type}
                className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  w-full ${className}`}
                id={Id}
                ref={ref}
                {...props}
            />
        </div>
    )
})


export default Input