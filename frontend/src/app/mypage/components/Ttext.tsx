import React from 'react'

const Ttext = ({children, className,onClick} : {onClick:()=>void,className: string, children: React.ReactNode})=>{
return (
    <div>
        <span className={className} onClick={onClick}>{children}</span>
    </div>
)
}

export default Ttext