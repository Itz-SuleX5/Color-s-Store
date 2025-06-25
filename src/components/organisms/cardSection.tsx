import React from "react";
import Card from "../molecules/card";


const testProduct = [{
    title:"Sticker Galaxia Pastel",
    price:3.99,
    imageUrl:"https://ehjmulylrjbirzfammmt.supabase.co/storage/v1/object/public/test//image%20(3).svg",
    category: "Stickers"
},
{
    title:"Sticker Galaxia Pastel",
    price:3.99,
    imageUrl:"https://ehjmulylrjbirzfammmt.supabase.co/storage/v1/object/public/test//image%20(3).svg",
    category: "Stickers"
},
{
    title:"Sticker Galaxia Pastel",
    price:3.99,
    imageUrl:"https://ehjmulylrjbirzfammmt.supabase.co/storage/v1/object/public/test//image%20(3).svg",
    category: "Stickers"
},
{
    title:"Sticker Galaxia Pastel",
    price:3.99,
    imageUrl:"https://ehjmulylrjbirzfammmt.supabase.co/storage/v1/object/public/test//image%20(3).svg",
    category: "Stickers"
},
{
    title:"Sticker Galaxia Pastel",
    price:3.99,
    imageUrl:"https://ehjmulylrjbirzfammmt.supabase.co/storage/v1/object/public/test//image%20(3).svg",
    category: "Stickers"
},
{
    title:"Sticker Galaxia Pastel",
    price:3.99,
    imageUrl:"https://ehjmulylrjbirzfammmt.supabase.co/storage/v1/object/public/test//image%20(3).svg",
    category: "Stickers"
},


];
const CardSection = () => (
    <div className="bg-yellow-50 flex w-full p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {testProduct.map((testProduct) => (
        <Card 
                title={testProduct.title}
                price={testProduct.price}
                imageUrl={testProduct.imageUrl}
                category={testProduct.category}
                />
         ))}
            
        </div>
        
    </div>
);

export default CardSection;