import React, { useState, useRef, useEffect }from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const Navbar = ({term, setTerm}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (search && inputRef.current){
            inputRef.current.focus();
        }
    }, [search]);

    return (
    <nav className="w-full">
        <div className="p-4 flex grid grid-cols-3 px-7">
            <button onClick={() => setOpen(!open)}>
                <DynamicIcon name="menu" color="currentColor" className="text-fuchsia-400"/>
            </button>
            
            <h1 className="text-fuchsia-400 font-bold text-center">Color's Store</h1>
            <div className="flex relative justify-end">
                <div className="relative w-60 flex">
                    {search &&(
                    <div>
                    <div className="absolute left-2 top-1">
                        <DynamicIcon name="search" color="currentColor" className="text-fuchsia-400"/>
                    </div>
                    { term!=('') &&(
                    <div className="absolute right-2 top-1">
                        <button type="button" onClick={() => setTerm('')}>
                            <DynamicIcon name="x" color="currentColor" className="text-fuchsia-600"/>
                        </button>
                        
                    </div> 
                    )}
                     
                
                    <input ref={inputRef} type="text" className="rounded-full border border-fuchsia-400 indent-8 w-60 h-8" placeholder="Buscar productos..." onChange={(e) => setTerm(e.target.value)} onBlur={() => setTimeout(() => setSearch(false), 150)} value={term}/>
                    </div>
                    )}
                {!search &&(
                    <button onClick={() => setSearch(true)} className="ml-auto">
                        <DynamicIcon name="search" color="currentColor" className="text-fuchsia-400"/>
                    </button>
                )}
                    
                    
                    
                </div>
            </div>
            
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