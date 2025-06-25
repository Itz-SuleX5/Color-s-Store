import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/navbar";
import FilterSection from "./components/organisms/filterSection";
import CardSection from "./components/organisms/cardSection";
import Footer from "./components/organisms/footer";

const App = () => {
  return (
    <Router>
      <div id="app" className="flex flex-col min-h-screen">
        <Navbar />
        <FilterSection />
        <CardSection/>
        <Footer/>
        <main className="flex-1">
          <Routes>
           
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;