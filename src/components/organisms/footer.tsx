import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const Footer = () => (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 bg-amber-200 px-4 md:px-16 py-9 gap-8 flex ">
        <div className="md:border-r-2 md:border-b-0 pb-8 border-dotted border-pink-300 border-b-2 pr-4 flex flex-col items-center md:items-start">
            <h1 className="text-fuchsia-400 text-lg font-medium mb-3">Sobre mi</h1>
            <div className="flex-col flex md:flex-row items-center md:items-start">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex justify-center items-center shrink-0">
                    <DynamicIcon name="user-round" color="currentColor" className="text-gray-500"/>
                </div>
                <div className="flex flex-col gap-2 text-gray-700">
                    <h2>Hola, soy Dani, la creadora detras de <span className="font-medium">Color's Store</span>. Me encanta disenar productos que traigan alegria y color a tu dia a dia.</h2>
                    <h2>Todos mis disenos son originales y estan hechos con mucho amor.</h2>
                </div>
            
            </div>
            
        </div>

        <div className="flex flex-col items-center mx-auto md:border-r-2 border-r-0 md:border-b-0 border-b-2 pb-8 border-dotted border-pink-300 px-20">
            <h1 className="text-fuchsia-400 text-lg font-medium mb-3">Contacto</h1>
            <h2 className="text-gray-700 items-center">¿Tienes alguna pregunta o sugerencia? ¡No dudes en contactarme!</h2>
        </div>

        <div className="flex flex-col md:items-end items-center px-16">
            <h1 className="text-fuchsia-400 text-lg font-medium mb-3">Sigueme</h1>
            <div className="flex gap-2">
                <div className="bg-pink-300 p-2 rounded-full flex">
                    <DynamicIcon name="instagram" color="currentColor" className="text-white"/>
                </div>
                <div className="bg-pink-300 p-2 rounded-full flex">
                    <DynamicIcon name="facebook" color="currentColor" className="text-white"/>
                </div>
                <div className="bg-pink-300 p-2 rounded-full flex">
                    <DynamicIcon name="twitter" color="currentColor" className="text-white"/>
                </div>
                
            </div>
            
            <h2 className="text-gray-700 md:text-right">Mantente al dia con mis nuevos disenos y ofertas especiales.</h2>
        </div>

        
    </div>

        <div className="bg-amber-200">
            <div className="border-t-2 border-dotted w-11/12 items-center justify-center mx-auto flex border-pink-300 text-gray-700 py-2">
                2025 Color's Store, Todos los derechos reservados.
            </div>
                    
        </div>

        </>
);

export default Footer;