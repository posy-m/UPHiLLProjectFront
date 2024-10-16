import React from 'react'

const Input = ({name,inputype,className,inputholder,onChange,value} : {value:string,onChange:any,name:string,inputype : any, className: string,inputholder:string | undefined}) =>{
    return (
            <input name={name} value={value} type={inputype} className={className} placeholder={inputholder} onChange={onChange}  />
    )
}

export default Input