import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Pill } from "../atoms/Pill";

const FilterSection = () => (
    <div className="flex gap-3 p-4 bg-stone-50 px-7 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Pill text="Todos" className="bg-purple-300"/>
        <Pill text="Stickers" className="bg-pink-300"/>
        <Pill text="Posters"className="bg-blue-200"/>
        <Pill text="Camisetas" className="bg-orange-200"/>
        <Pill text="Llaveros" className="bg-purple-400"/>
        <Pill text="Billeteras" className="bg-blue-600"/>
        <Pill text="Tazas" className="bg-pink-300"/>
        <Pill text="Libretas"className="bg-blue-200"/>
        <Pill text="Filtrar por precio" className="bg-orange-200 ml-auto !w-36 !text-cyan-900 font-medium"/>

    </div>
);

export default FilterSection;