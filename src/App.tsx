// src/App.js - Tu App modificada
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/organisms/navbar";
import FilterSection from "./components/organisms/filterSection";
import CardSection from "./components/organisms/cardSection";
import Footer from "./components/organisms/footer";
import Admin from "./components/organisms/admin";
import AdminAuth from "./components/molecules/adminAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});



// Componente para redirigir /admin a /admin-auth si no está autenticado
const AdminRedirect = () => {
  return <Navigate to="/admin-auth" replace />;
};

const App = () => {
  const [term, setTerm] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div id="app" className="flex flex-col min-h-screen">
          <main className="flex-1">
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<> <Navbar term={term} setTerm={setTerm}/><CardSection term={term}/> <Footer/></>}/>
              
              {/* Ruta de admin protegida */}
              <Route path="/admin" element={<Admin/>}/>
              
              {/* Ruta de autenticación */}
              <Route path="/admin-auth" element={<AdminAuth/>}/>
              
              {/* Ruta 404 - redirigir al home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;