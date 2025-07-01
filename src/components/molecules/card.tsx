import React from "react";
import { Pill } from "../atoms/Pill";

interface ProductCardProps {
    title: string;
    price: number;
    imageUrl: string;
}

const Card: React.FC<ProductCardProps> = ({title, price, imageUrl, category, available, onViewDetails}) => (
    <div className="bg-white rounded-lg border border-purple-300">
        <div className="relative w-auto h-80 overflow-hidden rounded-t-lg">
            <img src={imageUrl || "https://placehold.co/400x300"} alt="" className="object-cover w-full h-full"/>
            <div className={`absolute z-10 top-2 right-2 py-1 px-2 rounded text-white rotate-6 ${category.color}`}>
                {category.name}
            </div>
            <div className={`absolute z-10 top-4 -left-7 bg-emerald-300 -rotate-45 px-6 text-white text-sm ${available ? "bg-emerald-300" : "bg-red-300"}`}>
                {available ? "Disponible" : "Agotado"}
            </div>
        </div>
        
        <div className="p-4 gap-2 flex flex-col">
            <h1 className="text-purple-300 font-bold">{title}</h1>
        <div className="bg-orange-100 text-cyan-900 font-medium w-12 h-12 rounded-full flex justify-center items-center">
            ${price}
        </div>
        <Pill text="Ver detalles" className="!w-full !h-10 bg-gradient-to-r from-pink-300 to-purple-300" onClick={onViewDetails}/>
        </div>
        

    </div>
);


export default Card;