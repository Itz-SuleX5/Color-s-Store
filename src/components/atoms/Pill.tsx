import React from "react";


interface PillProps {
    text: string;
    className?:string;
}
const Pill: React.FC<PillProps> = ({text, className = ""}) => (
    <button className={`md:h-10 md:w-20 h-10 w-20 p-0 rounded-full text-white cursor-pointer flex-shrink-0 hover:brightness-90 ${className}`}>
            {text}
        </button>
);

export { Pill }