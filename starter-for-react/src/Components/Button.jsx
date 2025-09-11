import React from 'react'

const Button = ({
    children,
    type = "button",
    classname = "",
    textcolor = "black",
    bgColor = "white",
    ...props
}) => {
  return (
    <button
      type={type}
      className={`${classname} text-${textcolor} bg-${bgColor} py-2 px-4 rounded`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button