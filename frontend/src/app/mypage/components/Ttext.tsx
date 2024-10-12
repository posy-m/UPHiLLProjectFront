import React from 'react'

const Ttext = ({children, spanchild,onClick} : {onClick:()=>void,spanchild: string, children: React.ReactNode})=>{
return (
    <div>
        <span className={spanchild} onClick={onClick}>{children}</span>
    </div>
)
}

export default Ttext