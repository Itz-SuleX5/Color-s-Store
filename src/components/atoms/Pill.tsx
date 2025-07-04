import React, { ReactNode } from "react";
import { DynamicIcon } from "lucide-react/dynamic";


interface PillProps {
    text: string;
    className?:string;
    onClick?: () => void;
    icon: string;
    children?: ReactNode;
}
const Pill: React.FC<PillProps> = ({text, className = "", onClick, icon = ""}) => (
    <button className={`md:h-10 md:w-20 h-10 w-20 p-0 rounded-full text-white cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 hover:brightness-90 ${className}`} onClick={onClick}>
            {icon && <DynamicIcon name={icon} color="currentColor" className="text-white"/>}<span>{text}</span>
        </button>
);

export { Pill }