import React from 'react'

const Ttext = ({children, spanchild} : {spanchild: string, children: React.ReactNode})=>{
return (
    <div>
        <span className={spanchild}>{children}</span>
    </div>
)
}

export default Ttext