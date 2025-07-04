import React, { ReactNode } from "react";
import { DynamicIcon } from "lucide-react/dynamic";


interface PillProps {
    text: string;
    className?:string;
    onClick?: () => void;
    icon: string;
    children?: ReactNode;
}


const Pill: React.FC<PillProps> = ({text, className = "", onClick, icon = ""}) => {

    const widthValue = `${text.length * 10}px`;

    return (
        <button className={`h-10 p-0 rounded-full text-white cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 hover:brightness-90 ${className}`} style={{width: widthValue}} onClick={onClick}>
            {icon && <DynamicIcon name={icon} color="currentColor" className="text-white"/>}<span>{text}</span>
        </button>
    )
    
};

export { Pill }