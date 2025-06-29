import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Pill } from "../atoms/Pill";
import { useCategories } from "../../hooks/useCategories";

const FilterSection = () => {
    const categories = useCategories();
    
    return (
        <div className="flex gap-3 p-4 bg-stone-50 px-7 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Pill key="all" text="Todos" className="bg-purple-300"/>
            {categories.map((cat) => (
                <Pill key={cat.id} text={cat.name} className={cat.color}/>
            ))}
        <Pill text="Filtrar por precio" className="bg-orange-200 ml-auto !w-36 !text-cyan-900 font-medium"/>

    </div>
    )
    
};

export default FilterSection;