import React, { useState, useEffect } from "react";
import NewProduct from "../molecules/newProduct";
import ProductList from "../molecules/productList";
import CategoriesList from "../molecules/categoriesList";


const Admin = () => {
    const [stage, setStage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    



    return (
        <div className="bg-yellow-50 p-4">
            <div className="bg-white p-4 rounded-lg">
                <h1 className="text-purple-400 text-2xl font-medium">Panel de administración</h1>
                <div className="flex gap-10 border-b-2">
                    <button 
                        className={`py-4 ${stage === 1 ? "border-b-2 text-purple-400 border-pink-300" : "text-gray-600"}`} 
                        onClick={() => {setStage(1); setSelectedProduct(null)}}
                    >
                        Nuevo producto
                    </button>
                    <button 
                        className={`py-4 ${stage === 2 ? "border-b-2 text-purple-400 border-pink-300" : "text-gray-600"}`} 
                        onClick={() => setStage(2)}
                    >
                        Gestionar productos
                    </button>
                    <button 
                        className={`py-4 ${stage === 3 ? "border-b-2 text-purple-400 border-pink-300" : "text-gray-600"}`} 
                        onClick={() => setStage(3)}
                    >
                        Categorías
                    </button>
                </div>

                

            {stage === 1 && (
                <NewProduct selectedProduct={selectedProduct}/>
            )}

            {stage === 2 &&(
                <ProductList setSelectedProduct={setSelectedProduct} setStage={setStage}/>
            )}    
            
            {stage === 3 &&(
                <CategoriesList/>
            )}
                
                

            </div>
        </div>
    );
};

export default Admin;