import React from "react";


interface CategoryPillProps {
    text: string;
    className?:string;
}
const CategoryPill: React.FC<CategoryPillProps> = ({text, className = ""}) => (
    <div className={`p-2 px-5 rounded-full text-white ${className}`}>
            {text}
        </div>
);

export { CategoryPill }