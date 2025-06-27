import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { DynamicIcon } from "lucide-react/dynamic";
import  PrincipalDnD  from "../molecules/principalDnD";
import Card from "../molecules/card";

const Admin = () => {
    const [stage, setStage] = useState(1);
    const [title, setTitle] = useState("Nombre del producto");
    const [price, setPrice] = useState("0.00");
    const [category, setCategory] = useState("Categoria");
    const [imageUrl, setImageUrl] = useState("https://placehold.co/400x300");
    const [selectedFile, setSelectedFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

    const handleImageChange = (file) => {
        if (!file) return;
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        fetch(`${supabaseUrl}/rest/v1/categories`, {
            headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
            },
        })
        .then(res => res.json())
        .then(data => setCategories(data))
        
    }, [supabaseUrl, supabaseKey]);

    const handleSave = async () => {
        let uploadedImageUrl = imageUrl;
        if (selectedFile) {
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
    const response = await fetch(`${supabaseUrl}/rest/v1/products`, {
        method:"POST",
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
            category_id: categoryObj ? categoryObj.id : null
        })
    });
    if (response.ok){
        alert("Product guardado correctamente")
    } else {
        alert("Error al guardar el producto")
    }


};

    return (
        <div className="bg-yellow-50 p-4">
            <div className="bg-white p-4 rounded-lg">
                <h1 className="text-purple-400 text-2xl font-medium">Panel de administración</h1>
                <div className="flex gap-10 border-b-2">
                    <button 
                        className={`py-4 ${stage === 1 ? "border-b-2 text-purple-400 border-pink-300" : "text-gray-600"}`} 
                        onClick={() => setStage(1)}
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

                <div className="grid grid-cols-1 md:grid-cols-2 items-start">
                    <div>
                        <div className="w-full bg-stone-50 text-blue-600 flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1">
                                <DynamicIcon name="image" color="currentColor" className="w-4 h-4"/>
                                <h1 className="text-l font-medium">Imagen principal</h1>
                            </div>
                            <PrincipalDnD onImageChange={handleImageChange}/>
                        </div>

                        <div className="w-full bg-stone-50  flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1 text-blue-600">
                                <DynamicIcon name="tag" color="currentColor" className="w-4 h-4" />
                                <h1 className="text-l font-medium">Detalles del producto</h1>
                            </div>
                            <div>
                                <h1>Titulo</h1>
                                <input type="text" className="border border-purple-300 rounded w-full py-1 indent-2" placeholder="Nombre del producto" onChange={e => setTitle(e.target.value)}/>
                            </div>
                            <div className="flex flex-col grid grid-cols-2 gap-2">
                                <div>
                                    <h1>Precio</h1>
                                <div className="relative flex items-center">
                                    <div className="absolute left-2">
                                        <h1 className="text-gray-500">$</h1>
                                    </div>
                                    
                                    <input type="text" className="border border-purple-300 rounded py-1 indent-6 w-full" placeholder="0.0" onChange={e => setPrice(e.target.value)}/>
                                </div>
                                </div>
                                <div>
                                    <h1>Categoria</h1>
                                    <select name="category" id="category" className="border border-purple-300 rounded py-1 indent-2 w-full" onChange={e => setCategory(e.target.value)} >
                                    {categories.map((category)=> (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                        


                                    </select>
                                </div>
                                
                                
                            </div>
                            
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
                        />

                    </div>
                        


                    
                </div>


            <div className="flex justify-center py-2">
                <button className="text-white bg-gradient-to-r from-pink-300 to-purple-300 flex p-2 rounded-full transition-all duration-300
                transform hover:scale-105 hover:from-pink-400 hover:to-purple-400" onClick={handleSave}>
                    <DynamicIcon name="save" color="currentColor" className="text-white"/>
                    Guardar producto
                </button>
            </div>
                
                

            </div>
        </div>
    );
};

export default Admin;