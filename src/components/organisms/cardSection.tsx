import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../molecules/card";
import ProductModal from "../molecules/productModal";
import FilterSection from "./filterSection";
import { useProductsScrolled } from "../../hooks/useProducts";

const CardSection = () => {
    // Usar el hook correcto con destructuring apropiado
    const { 
        products, 
        error, 
        fetchNextPage, 
        hasNextPage, 
        isFetching, 
        isFetchingNextPage, 
        status 
    } = useProductsScrolled();
    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [showModal, setShowModal] = useState(false);
    
    // Ref para el último elemento (para intersection observer)
    const lastElementRef = useRef(null);
    
    // Combinar productos de todas las páginas
    const allProducts = products?.pages?.flatMap(page => page.products) || [];
    
    // Filtrar productos por categoría
    const filteredProducts = selectedCategory === "Todos" 
        ? allProducts 
        : allProducts.filter(p => p.categories?.name === selectedCategory);
    
    // Intersection Observer para detectar cuando llegar al final
    const lastProductElementRef = useCallback(node => {
        if (isFetchingNextPage) return;
        if (lastElementRef.current) lastElementRef.current.disconnect();
        
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage();
            }
        });
        
        if (node) lastElementRef.current.observe(node);
    }, [isFetchingNextPage, hasNextPage, isFetching, fetchNextPage]);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    // Manejo de estados de carga y error
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Cargando productos...</div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">Error: {error?.message}</div>
            </div>
        );
    }

    return (
        <div>
            <FilterSection setSelectedCategory={setSelectedCategory} />
            <div className="bg-yellow-50 w-full p-12 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {filteredProducts.map((testProduct) => (
                        <Card
                            key={testProduct.id}
                            title={testProduct.title}
                            price={testProduct.price}
                            imageUrl={testProduct.main_image_url}
                            category={testProduct.categories}
                            available={testProduct.available}
                            onViewDetails={() => handleViewDetails(testProduct)}
                        />
                    ))}
                </div>
                
                {/* Elemento centinela invisible para scroll infinito */}
                {hasNextPage && (
                    <div 
                        ref={lastProductElementRef}
                        className="h-10 w-full flex items-center justify-center"
                    >
                        {isFetchingNextPage && (
                            <div className="text-lg text-gray-500">Cargando más productos...</div>
                        )}
                    </div>
                )}
                
                
                {/* Botón manual para cargar más (opcional - se puede quitar si solo quieres scroll automático) */}
                {hasNextPage && !isFetchingNextPage && (
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={() => fetchNextPage()}
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            Cargar más productos
                        </button>
                    </div>
                )}
                
                {/* Mensaje cuando no hay más productos */}
                {!hasNextPage && allProducts.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <div className="text-gray-500">No hay más productos para mostrar</div>
                    </div>
                )}
            </div>
            
            {showModal && selectedProduct && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default CardSection;