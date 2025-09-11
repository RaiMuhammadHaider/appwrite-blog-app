import React from 'react'

const Logo = ({width = '100px'}) => {
  return (
    <div className={`w-${width} font-bold`}>Logo</div>
  )
}

export default Logo