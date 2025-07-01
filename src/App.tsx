import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/navbar";
import FilterSection from "./components/organisms/filterSection";
import CardSection from "./components/organisms/cardSection";
import Footer from "./components/organisms/footer";
import Admin from "./components/organisms/admin";



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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div id="app" className="flex flex-col min-h-screen">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<> <Navbar/><CardSection/> <Footer/></>}></Route>
              <Route path="/admin" element={<Admin/>}/>
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;