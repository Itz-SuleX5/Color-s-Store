import React, { useState, useEffect } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useCategories } from "../../hooks/useCategories";
import Card from "../molecules/card";
import { supabase } from '../../utilities/supabase';
import { createClient } from "@supabase/supabase-js";
import PrincipalDnD from "./principalDnD";


const NewProduct = ({ selectedProduct, refetch }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
        const categories = useCategories();
        const [title, setTitle] = useState("");
        const [price, setPrice] = useState("");
        const [category, setCategory] = useState("");
        const [available, setAvailable] = useState(true);
        const [description, setDescription] = useState("");
        const [imageUrl, setImageUrl] = useState("");
        const [selectedFile, setSelectedFile] = useState(null);
        const [method, setMethod] = useState("POST");
        const [url, setUrl] = useState(`${supabaseUrl}/rest/v1/products`);
        

    useEffect(() => {
    if (selectedProduct) {
        setTitle(selectedProduct.title);
        setPrice(selectedProduct.price);
        setCategory(selectedProduct.categories?.name);
        setAvailable(selectedProduct.available);
        setImageUrl(selectedProduct.main_image_url);
        setSelectedFile(null);
        setMethod("PATCH");
        setUrl(`${supabaseUrl}/rest/v1/products?id=eq.${selectedProduct.id}`);
    } else {
        setTitle("");
        setPrice("");
        setCategory("");
        setAvailable(true);
        setImageUrl("");
        setSelectedFile(null);
        setMethod("POST");  // ← Faltaba esto
        setUrl(`${supabaseUrl}/rest/v1/products`);  // ← Y esto
    }
}, [selectedProduct]);

    useEffect(() => {
    if (categories.length > 0 && !category) {
        setCategory(categories[0].name);
    }
}, [categories, category]);

    useEffect(() => {
    if (description.length == 0){
        setDescription("Este producto es tan asombroso que es indescriptible, no tenemos una descripcion... por el momento");
    }
    },[description]);


    const handleImageChange = (file) => {
        if (!file) return;
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveAndReset = async () => {
        let uploadedImageUrl = imageUrl;
        if (selectedFile && selectedFile instanceof File) {
    const fileName = selectedFile.name; // Usa el nombre original
    const { data, error } = await supabase
        .storage
        .from('images')
        .upload(fileName, selectedFile);

    if (error) {
        alert("Error al subir la imagen: " + error.message);
        return;
    }

    const { data: publicUrlData } = supabase
        .storage
        .from('images')
        .getPublicUrl(fileName);
    uploadedImageUrl = publicUrlData.publicUrl;
}
  
    

    const categoryObj = categories.find(cat => cat.name === category);
    const body = {
        title,
        price: parseFloat(price),
        main_image_url: uploadedImageUrl,
        category_id: categoryObj ? categoryObj.id : null,
        available: Boolean(available),
        description,
    };
    console.log("Body enviado al fetch:", body);
    const response = await fetch(url,{
        method:method,
        headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
        body: JSON.stringify({
            title,
            price: parseFloat(price),
            main_image_url: uploadedImageUrl,
            category_id: categoryObj ? categoryObj.id : null,
            available: Boolean(available),
            description,
        })
    });
    if (response.ok){
        alert("Product guardado correctamente");
        refetch();
    } else {
        alert("Error al guardar el producto")
    }

        setTitle("");
        setPrice("");
        setCategory("");
        setAvailable(true);
        setImageUrl("");
        setSelectedFile(null);
        setSelectedProduct(null);
    };



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">
                    <div>
                        <div className="w-full bg-stone-50 text-blue-600 flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1">
                                <DynamicIcon name="image" color="currentColor" className="w-4 h-4"/>
                                <h1 className="text-l font-medium">Imagen principal</h1>
                            </div>
                            <PrincipalDnD onImageChange={handleImageChange} initialImage={imageUrl}/>
                        </div>

                        <div className="w-full bg-stone-50  flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1 text-blue-600">
                                <DynamicIcon name="tag" color="currentColor" className="w-4 h-4" />
                                <h1 className="text-l font-medium">Detalles del producto</h1>
                            </div>
                            <div>
                                <h1>Titulo</h1>
                                <input type="text" className="border border-purple-300 rounded w-full py-1 indent-2" placeholder="Nombre del producto" onChange={e => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className="flex flex-col grid grid-cols-2 gap-2">
                                <div>
                                    <h1>Precio</h1>
                                <div className="relative flex items-center">
                                    <div className="absolute left-2">
                                        <h1 className="text-gray-500">$</h1>
                                    </div>
                                    
                                    <input type="text" className="border border-purple-300 rounded py-1 indent-6 w-full" placeholder="0.0" onChange={e => setPrice(e.target.value)} value={price}/>
                                </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                    <h1>Categoria</h1>
                                    <select name="category" id="category" className="border border-purple-300 rounded py-1 indent-2 w-full" onChange={e => setCategory(e.target.value)} value={category} >
                                    {categories.map((category)=> (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                    </select>
                                </div>
                                <div>
                                    <h1>Disponibilidad</h1>
                                    <select name="available" id="available" className="border border-purple-300 rounded py-1 indent-2 w-full" onChange={e => setAvailable(e.target.value === "TRUE")} value={available ? "TRUE" : "FALSE"} >
                                        <option value="TRUE">Disponible</option>
                                        <option value="FALSE">Agotado</option>
                                    </select>
                                </div>
                                </div>
                                
                                
                                
                            </div>
                            
                        </div>

                        <div className="w-full bg-stone-50 text-blue-600 flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1">
                                <DynamicIcon name="align-left" color="currentColor" className="w-4 h-4"/>
                                <h1 className="text-l font-medium">Descripcion</h1>
                            </div>
                            <textarea className="border border-purple-300 rounded resize-none indent-2 py-1 min-h-[100px] text-black" placeholder="Descripcion del producto" onChange={e => setDescription(e.target.value)} value={description}/>
                        </div>

                    </div>
                    
                    <div className="md:w-3/5 h-auto ml-auto mt-4 p-4 border-2 border-dotted border-purple-300">
                        <div className="flex gap-1 items-center mb-2">
                            <DynamicIcon name="eye" color="currentColor" className="text-blue-600"/>
                            <h1 className="text-blue-600 text-l font-medium">Vista previa</h1>
                        </div>
                    

                        <Card 
                            key="1"
                            title={title}
                            price={price}
                            imageUrl={imageUrl}
                            category={category}
                            available={available}
                        />

                    </div>
                        
            <div className="flex justify-center py-2">
                                            <button className="text-white bg-gradient-to-r from-pink-300 to-purple-300 flex p-2 rounded-full transition-all duration-300
                                            transform hover:scale-105 hover:from-pink-400 hover:to-purple-400" onClick={() => { handleSaveAndReset()}} >
                                                <DynamicIcon name="save" color="currentColor" className="text-white"/>
                                                Guardar producto
                                            </button>
                                        </div>

                    
                </div>

                
    );
};
    
export default NewProduct;