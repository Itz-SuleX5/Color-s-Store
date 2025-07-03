import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { UseProductsPaginated } from "../../hooks/useProducts";
import { Pill } from "../atoms/Pill";
import { DynamicIcon } from "lucide-react/dynamic";

const itemsPerPage = 10;

const ProductList = ({ setSelectedProduct, setStage }) => {
    const [currentPage, setCurrentPage] = useState(0);
    
    // Destructure the data object to get the actual products array
    const { products: data, isLoading, refetch } = UseProductsPaginated(currentPage, itemsPerPage);
    
    // Extract the products array and totalPages from the data object
    const products = data?.products || [];
    const totalPages = data?.totalPages || 1;
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    }

    const deleteProduct = async (id) => {
        await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
            method: "DELETE",
            headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            }
        });
        refetch();
    }

    // Show loading state
    if (isLoading) {
        return <div>Loading...</div>;
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
            {products.map((product) => (
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
                pageCount={totalPages} // Use the actual total pages from the hook
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"flex gap-2 justify-center mt-4"}
                activeClassName={"font-bold text-purple-500"}
                pageClassName={"px-2 py-1 rounded hover:bg-purple-100"}
                previousClassName={"px-2 py-1"}
                nextClassName={"px-2 py-1"}
                breakClassName={"px-2 py-1"}
                forcePage={currentPage} // Add this to keep the pagination in sync
            />
        </div>
    );
};

export default ProductList;