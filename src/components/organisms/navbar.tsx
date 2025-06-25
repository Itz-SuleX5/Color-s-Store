import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const Navbar = () => (
    <nav>
        <div className="p-4 flex justify-between px-7">
            <DynamicIcon name="menu" color="currentColor" className="text-fuchsia-400"/>
            <h1 className="text-fuchsia-400 font-bold">Color's Store</h1>
            <DynamicIcon name="search" color="currentColor" className="text-fuchsia-400"/>
        </div>
        
    </nav>    
);

export default Navbar;