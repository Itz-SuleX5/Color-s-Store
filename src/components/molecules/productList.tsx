import React, { useState }from "react";
import ReactPaginate from "react-paginate";
import { UseProducts } from "../../hooks/useProducts";
import { Pill } from "../atoms/Pill";
import { DynamicIcon } from "lucide-react/dynamic";

const itemsPerPage = 10;

const ProductList = ({ setSelectedProduct, setStage }) => {
    const {products, isLoading, isError, error, refetch} = UseProducts();
    const [currentpage, setCurrentPage] = useState(0);
    

    const offset = currentpage * itemsPerPage;
    const currentProducts = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    }

    const deleteProduct = async (id) => {
        await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
        method:"DELETE",
            headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        }
    });
    refetch();
}

    return (
        <div>
            <div className="grid grid-cols-[1fr_5fr_2fr_1fr_1fr_1fr] font-bold border-b border-purple-200 py-2">
                <div>
                    <h1>Imagen</h1>
                </div>
                <div>
                    <h1>Nombre</h1>
                </div>
                <div>
                    <h1>Categoria</h1>
                </div>
                <div>
                    <h1>Precio</h1>
                </div>
                <div>
                    <h1>Stock</h1>
                </div>
                <div>
                    <h1>Acciones</h1>
                </div>
            </div>
            {currentProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-[1fr_5fr_2fr_1fr_1fr_1fr] items-center border-b border-purple-100 py-2">
                    <div>
                        <img src={product.imageUrl || product.main_image_url} alt={product.title} className="w-20 h-20 object-cover rounded" />
                    </div>
                    <div>
                        <h1 className="font-medium">{product.title}</h1>
                    </div>
                    <div>
                        <Pill text={product.categories?.name} className={product.categories?.color}/>
                    </div>
                    <div>
                        <h1>${product.price}</h1>
                    </div>
                    <div>
                        <Pill text={product.available ? "Disponible" : "Agotado"} className={product.available ? "bg-emerald-300" : "bg-red-300"}/>
                    </div>
                    <div className="flex gap-4">
                        
                        <button onClick={() => {setSelectedProduct(product), setStage(1)}}>
                            <DynamicIcon name="pen" color="currentColor" className="text-purple-400"/>
                        </button>
                        <button onClick={() => deleteProduct(product.id)}>
                            <DynamicIcon name="trash-2" color="currentColor" className="text-red-400" />
                        </button>
                    </div>
                </div>
            ))}
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"flex gap-2 justify-center mt-4"}
                activeClassName={"font-bold text-purple-500"}
                pageClassName={"px-2 py-1 rounded hover:bg-purple-100"}
                previousClassName={"px-2 py-1"}
                nextClassName={"px-2 py-1"}
                breakClassName={"px-2 py-1"}
            />
        </div>
    );
};

export default ProductList;