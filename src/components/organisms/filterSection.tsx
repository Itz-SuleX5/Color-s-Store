import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { CategoryPill } from "../atoms/categoryPill";

const FilterSection = () => (
    <div className="flex gap-3 p-4 bg-stone-50 px-7">
        <CategoryPill text="Todos" className="bg-purple-300"/>
        <CategoryPill text="Stickers" className="bg-pink-300"/>
        <CategoryPill text="Posters"className="bg-blue-200"/>
        <CategoryPill text="Camisetas" className="bg-orange-200"/>
        <CategoryPill text="Llaveros" className="bg-purple-400"/>
        <CategoryPill text="Billeteras" className="bg-blue-600"/>
        <CategoryPill text="Tazas" className="bg-pink-300"/>
        <CategoryPill text="Libretas"className="bg-blue-200"/>
        <CategoryPill text="Filtrar por precio" className="bg-orange-200 ml-auto text-cyan-900"/>

    </div>
);

export default FilterSection;