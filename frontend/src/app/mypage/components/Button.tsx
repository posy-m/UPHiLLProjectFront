import React from 'react'

// const Button = ( { children , buttonchild } : { buttonchild : string , children : React.ReactNode}) => {
  const Button = ( { buttonchild ,title} : { buttonchild : string,title:string}) => {
  return (
        <button className={buttonchild}>{title}</button>
  )
}

export default Button
