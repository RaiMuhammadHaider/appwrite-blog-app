import React from 'react'
import { useId } from 'react'
const Select = ({
    label,
    options,
    className,
    ...props
}, ref) => {
    const id = useId();

  return (
    <div>
        {label && <label htmlFor={id} className="block text-sm font-medium text-black bg-white mb-1">{label}</label>}
        <select name={id} id={id} className={`border border-gray-300 rounded-md p-2 ${className}`} ref={ref} {...props}>
            {options?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
   
  )
}

export default React.forwardRef(Select)