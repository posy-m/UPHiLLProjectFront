import React from 'react'

const Input = ({inputype,inputchild,inputholder} : {inputype : string, inputchild: string,inputholder:string | undefined}) =>{
    return (
            <input type={inputype} className={inputchild} placeholder={inputholder} />
    )
}

export default Input