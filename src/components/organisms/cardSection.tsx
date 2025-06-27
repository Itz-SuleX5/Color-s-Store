import React, { useState, useEffect } from "react";
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
const CardSection = () => {
    const [products, setProducts] = useState([])
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    useEffect(() => {
  fetch(`${supabaseUrl}/rest/v1/products?select=*,categories(name)`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, [supabaseUrl, supabaseKey]);

  return (
    <div className="bg-yellow-50 flex w-full p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {products.map((testProduct) => (
            <Card 
                key={testProduct.id}
                title={testProduct.title}
                price={testProduct.price}
                imageUrl={testProduct.main_image_url}
                category={testProduct.categories?.name}
            />
         ))}
            
        </div>
        
    </div>
);
};

export default CardSection;