// src/components/AdminAuth.js
import React, { useState } from 'react';
import { supabase } from '../../utilities/supabase';

const AdminAuth = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    shouldCreateUser: false, // Solo permitir usuarios existentes
                }
            });

            if (error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage('El enlace de inicio de sesion fue enviado al correo.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">
                        Acceso Administrativo
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Ingresa tu correo electrónico para recibir un enlace de acceso
                    </p>
                    
                    <form onSubmit={handleSignIn} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                placeholder="admin@ejemplo.com"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-400 hover:bg-purple-500 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Enviando...' : 'Enviar enlace de acceso'}
                        </button>
                        
                        {message && (
                            <div className={`text-center text-sm p-3 rounded-md ${
                                message.includes('Error') 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'bg-green-100 text-green-600'
                            }`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;