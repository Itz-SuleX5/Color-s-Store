import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/organisms/NavBar";
import FilterSection from "./components/organisms/filterSection";
import CardSection from "./components/organisms/cardSection";
import Footer from "./components/organisms/footer";

const App = () => {
  return (
    <Router>
      <div id="app" className="flex flex-col min-h-screen">
        <NavBar />
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