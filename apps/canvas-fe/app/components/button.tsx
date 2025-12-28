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
    return <div className="pointer rounded-full bg-black hover::bg-grey p-2" onClick={onClick}>
    {children}</div>
}