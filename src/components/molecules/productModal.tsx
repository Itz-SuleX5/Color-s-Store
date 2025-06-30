import { Pill } from "../atoms/Pill";
import React from "react";
import UseWhatsappLink from "../../hooks/useWhatsappLink";
import useSignedImageUrl from "../../hooks/useSignedImageUrl";


const ProductModal = ({ product, onClose}) => {
    const whatsappLink = UseWhatsappLink(product);

    return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white grid md:grid-cols-2 md:w-4/5 md:h-4/6 rounded relative p-8 gap-8">
            <button
                className="absolute top-2 right-2 text-pink-300 hover:text-pink-400 bg-gray-100 p-2 rounded-full w-8 h-8 items-center justify-center flex"
                onClick={onClose}
            >
                ✕
            </button>
            <div className="max-h-max sm:width-full mx-auto flex">
                <img src={product.main_image_url} alt={product.title} className="w-9/12 h-auto object-cover rounded-lg mb-4 aspect-square mx-auto md:mx-0 " />
            </div>
            <div className="flex flex-col h-full ">
                <div className="grid grid-cols-[8fr_2fr]">
                    <div>
                        <div className="gap-2 flex mb-2">
                            <Pill className={product.categories?.color} text={product.categories?.name}></Pill>
                            <Pill className={`${product.available ? "bg-emerald-300" : "bg-red-300"} !w-24`} text={product.available ? "Disponible" : "Agotado"}></Pill>
                        </div>
                        
                        <h2 className="text-5xl font-bold mb-2 text-purple-300">{product.title}</h2>
                    </div>
                    <div className="bg-orange-100 text-cyan-900 text-xl font-medium w-16 h-16 rounded-full flex justify-center items-center">
                    ${product.price}
                    </div>
                </div>
                <div>

                </div>
                <h1 className="text-purple-300 font-medium">Descripcion</h1>
                <h2 className="text-gray-600">{product.description}</h2>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="md:mt-auto mt-4 h-10">
                    <Pill text="Comprar" className="!w-full !h-10 bg-gradient-to-r from-pink-300 to-purple-300" onClick={UseWhatsappLink}/>
                </a>
                
                
            </div>
            
            
        </div>
    </div>
    );
};
    


export default ProductModal;