import React, { useState, useEffect } from "react";
import Card from "../molecules/card";
import ProductModal from "../molecules/productModal";
import FilterSection from "./filterSection";

const CardSection = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Todos")
    const [showModal, setShowModal] = useState(false);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    const filteredProducts = selectedCategory === "Todos" ? products : products.filter(p => p.categories?.name === selectedCategory)

    useEffect(() => {
  fetch(`${supabaseUrl}/rest/v1/products?select=*,categories(name,color)`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, [supabaseUrl, supabaseKey]);


    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal= () => {
        setSelectedProduct(null);
        setShowModal(false);
    }


  return (
    <div>
    <FilterSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
    <div className="bg-yellow-50 flex w-full p-12 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {filteredProducts.map((testProduct) => (
            <Card 
                key={testProduct.id}
                title={testProduct.title}
                price={testProduct.price}
                imageUrl={testProduct.main_image_url}
                category={testProduct.categories}
                available={testProduct.available}
                onViewDetails={() => handleViewDetails(testProduct)}

            />
         ))}
            
        </div>
        {showModal && selectedProduct &&(
            <ProductModal product={selectedProduct} onClose={handleCloseModal}/>
        )}
        
    </div>
    </div>
);
};

export default CardSection;