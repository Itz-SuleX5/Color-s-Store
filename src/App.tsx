import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/navbar";
import FilterSection from "./components/organisms/filterSection";
import CardSection from "./components/organisms/cardSection";
import Footer from "./components/organisms/footer";
import Admin from "./components/organisms/admin";

const App = () => {
  return (
    <Router>
      <div id="app" className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<> <Navbar/> <FilterSection/><CardSection/> <Footer/></>}></Route>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;