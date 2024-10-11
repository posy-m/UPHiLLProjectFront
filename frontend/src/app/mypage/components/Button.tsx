import React from 'react'

// const Button = ( { children , buttonchild } : { buttonchild : string , children : React.ReactNode}) => {
  const Button = ( { className ,title,onClick} : {onClick:any, className : string,title:string}) => {
  return (
        <button className={className} onClick={onClick}>{title}</button>
  )
}

export default Button
