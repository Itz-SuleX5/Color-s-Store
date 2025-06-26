import React, { useState }from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
    <nav>
        <div className="p-4 flex justify-between px-7">
            <button onClick={() => setOpen(!open)}>
                <DynamicIcon name="menu" color="currentColor" className="text-fuchsia-400"/>
            </button>
            
            <h1 className="text-fuchsia-400 font-bold">Color's Store</h1>
            <DynamicIcon name="search" color="currentColor" className="text-fuchsia-400"/>
        </div>
        
        {open &&(
            <div className="bg-pink-100 md:w-52 w-full h-full fixed top-0 z-50 p-4 flex flex-col gap-4">
            <button className="ml-auto" onClick={() => setOpen(false)}> <DynamicIcon name="x" color="currentColor" className="text-red-400" /> </button>
            <div className="flex justify-center mx-auto w-4/5 text-red-400 font-medium border-b-2 border-rose-200 py-2">
                <h1>Color's Store</h1>
            </div>
            <ul className="text-neutral-700 gap-5 flex flex-col">
                <li>Inicio</li>
                <li>Catalogo</li>
                <li>Novedades</li>
                <li>Colecciones</li>
                <li>Ofertas</li>
                <li>Blog</li>
                <li>Contactos</li>
            </ul>

            <div className="flex mx-auto gap-5">
                <DynamicIcon name="instagram" color="currentColor" className="text-rose-400" />
                <DynamicIcon name="facebook" color="currentColor" className="text-rose-400" />
            </div>
            

        </div>
        )}

        
    </nav>  

      
);
};

export default Navbar;