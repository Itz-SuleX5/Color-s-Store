import React, { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import  PrincipalDnD  from "../molecules/principalDnD";

const Admin = () => {
    const [stage, setStage] = useState(1);

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

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <div className="w-full bg-stone-50 text-blue-600 flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1">
                                <DynamicIcon name="image" color="currentColor" className="w-4 h-4"/>
                                <h1 className="text-l font-medium">Imagen principal</h1>
                            </div>
                            <PrincipalDnD />
                        </div>

                        <div className="w-full bg-stone-50  flex flex-col gap-3 p-4 mt-4 rounded-xl border-2 border-dotted border-purple-300">
                            <div className="flex items-center gap-1 text-blue-600">
                                <DynamicIcon name="tag" color="currentColor" className="w-4 h-4" />
                                <h1 className="text-l font-medium">Detalles del producto</h1>
                            </div>
                            <div>
                                <h1>Titulo</h1>
                                <input type="text" className="border border-purple-300 rounded w-full py-1 indent-2" placeholder="Nombre del producto"/>
                            </div>
                            <div className="flex flex-col grid grid-cols-2 ">
                                <div>
                                    <h1>Precio</h1>
                                <div className="relative flex items-center">
                                    <div className="absolute left-2">
                                        <h1 className="text-gray-500">$</h1>
                                    </div>
                                    
                                    <input type="text" className="border border-purple-300 rounded py-1 indent-6 w-full" placeholder="0.0"/>
                                </div>
                                </div>
                                <div>
                                    <h1>Categoria</h1>
                                    <select name="" id="" >
                                        


                                    </select>
                                </div>
                                
                                
                            </div>
                            
                        </div>

                    </div>


                    
                </div>

                

            </div>
        </div>
    );
};

export default Admin;