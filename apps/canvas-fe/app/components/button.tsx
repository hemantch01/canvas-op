import { ReactNode } from "react"

export function Icon({
    children,
    onClick,
    isSelected
}:{
    children:ReactNode
    onClick:()=>void,
    isSelected:Boolean
}){
    return <div className={`pointer rounded-full ${isSelected?"bg-red-500 text-black":"bg-black "} hover::bg-grey p-2`} onClick={onClick}>
    {children}</div>
}

