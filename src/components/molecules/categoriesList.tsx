import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useCategories } from "../../hooks/useCategories";

const CategoriesList = () => {

    const categories = useCategories();

    return (
       <div>
        <div className="grid grid-cols-[4fr_2fr_2fr_2fr] font-bold items-centere border-b border-purple-100 py-2">
            <div>
                <h1>Nombre</h1>
            </div>
            <div>
                <h1>Color</h1>
            </div>
            <div>
                <h1>Productos</h1>
            </div>
            <div>
                <h1>Acciones</h1>
            </div>
        </div>
        {categories.map((cat) => (
            <div className="grid grid-cols-[4fr_2fr_2fr_2fr] pt-2">
                <div>
                    <h1>{cat.name}</h1>
                </div>
                <div className={`${cat.color} w-3/6`}/>
                <div>
                    <h1>Na</h1>
                </div>
                <div className="gap-4 flex">
                    <button>
                        <DynamicIcon name="pen" color="currentColor" className="text-purple-400"/>
                    </button>
                    <button>
                        <DynamicIcon name="trash-2" color="currentColor" className="text-red-400" />
                    </button>
                </div>
            </div>
        ))}

    </div> 
    )
}

export default CategoriesList;