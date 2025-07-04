// src/components/organisms/admin.js - Tu admin modificado
import React, { useState, useEffect } from "react";
import { supabase } from "../../utilities/supabase";
import { useNavigate } from 'react-router-dom';
import NewProduct from "../molecules/newProduct";
import ProductList from "../molecules/productList";
import CategoriesList from "../molecules/categoriesList";
import { UseProductsPaginated } from "../../hooks/useProducts";

const Admin = () => {
    const [stage, setStage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {products, isLoading, isError, error, refetch} = UseProductsPaginated();

    useEffect(() => {
        // Verificar sesión actual
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                
                if (session?.user) {
                    setUser(session.user);
                    
                } else {
                    // No hay sesión, redirigir a auth
                    navigate('/admin-auth');
                    return;
                }
            } catch (error) {
                console.error('Error verificando sesión:', error);
                navigate('/admin-auth');
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Escuchar cambios en la autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
                    
                    
                        setUser(session.user);
                        navigate('/admin');
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                    navigate('/admin-auth');
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // Mostrar loading mientras verifica la sesión
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-yellow-50">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
            </div>
        );
    }

    // Si no hay usuario, el useEffect se encarga de la redirección
    if (!user) {
        return null;
    }

    return (
        <div className="bg-yellow-50 p-4 min-h-screen">
            {/* Header con información del usuario y logout */}
            <div className="bg-white p-4 rounded-lg mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-purple-400 text-2xl font-medium">Panel de administración</h1>
                    <p className="text-gray-600 text-sm">Bienvenido, {user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Contenido principal del admin - Tu código original */}
            <div className="bg-white p-4 rounded-lg">
                <div className="flex gap-10 border-b-2">
                    <button 
                        className={`py-4 ${stage === 1 ? "border-b-2 text-purple-400 border-pink-300" : "text-gray-600"}`}
                        onClick={() => {setStage(1); setSelectedProduct(null)}}
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
                               
                {stage === 1 && (
                    <NewProduct selectedProduct={selectedProduct} refetch={refetch}/>
                )}
                
                {stage === 2 && (
                    <ProductList setSelectedProduct={setSelectedProduct} setStage={setStage} products={products} refetch={refetch}/>
                )}
                             
                {stage === 3 && (
                    <CategoriesList/>
                )}
            </div>
        </div>
    );
};

export default Admin;