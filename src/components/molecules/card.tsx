import React from "react";
import { Pill } from "../atoms/Pill";

interface ProductCardProps {
    title: string;
    price: number;
    imageUrl: string;
}

const Card: React.FC<ProductCardProps> = ({title, price, imageUrl, category}) => (
    <div className="bg-white rounded-lg">
        <div className="relative">
            <img src={imageUrl} alt="" className="object-contain"/>
            <div className="absolute z-10 top-2 right-2 bg-pink-300 py-1 px-2 rounded text-white rotate-6">
                {category}
            </div>
        </div>
        
        <div className="p-4 gap-2 flex flex-col">
            <h1 className="text-purple-300 font-bold">{title}</h1>
        <div className="bg-orange-100 text-cyan-900 font-medium w-12 h-12 rounded-full flex justify-center items-center">
            ${price}
        </div>
        <Pill text="Ver detalles" className="!w-full !h-10 bg-gradient-to-r from-pink-300 to-purple-300"/>
        </div>
        

    </div>
);

export default Card;