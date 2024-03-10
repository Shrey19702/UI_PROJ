import { useState } from "react";
import { Link} from "react-router-dom";

const states = {
    ////top left width height
    "Home": [8, 12, 72, 32],
    "Components": [8, 95, 118, 32],
    "Create": [8, 222, 72, 32],
    "Search": [8, 305, 75, 32],
}

export default function Navbar() {
    const [select, setselect] = useState("Home");
    return (
        <div className=" top-4 left-1/2 -translate-x-1/2 w-fit text-white backdrop-blur-md backdrop-brightness-50 bg-black/20 border border-white/50 rounded-full z-50 fixed shadow-inner">

            <div className=" h-[1px] absolute -top-[1px] w-4/5 z-20 left-8 bg-gradient-to-r from-transparent via-white/70 via-30% to-transparent" />

            <div className=" px-4 relative flex overflow-hidden rounded-full p-1 gap-5 font-semibold ">
                <div 
                    className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Home" ? 'text-white': 'text-white/70'} relative cursor-pointer transition-all `}
                    onClick={()=>{setselect("Home")}} 
                >
                    <Link to={'/'}>HOME</Link>
                </div>
                <div 
                    className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Components" ? 'text-white': 'text-white/70'} relative cursor-pointer transition-all `}
                    onClick={()=>{setselect("Components")}} 
                >
                    <Link to={'/components'}>Components</Link>
                </div>
                <div
                    className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Create" ? 'text-white': 'text-white/70'} relative cursor-pointer transition-all `}
                    onClick={()=>{setselect("Create")}} 
                >
                    <Link to={'/create'}>Create</Link> 
                </div>
                <div 
                    className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Search" ? 'text-white': 'text-white/70'} relative cursor-pointer transition-all `}
                    onClick={()=>{setselect("Search")}} 
                >
                    <Link to={'/search'}>Search</Link> 
                </div>

                <div 
                    style={{top: states[select][0], left: states[select][1]+10, width: states[select][2]-10, height: states[select][3]}}
                    className=" bg-white/80 rounded-full absolute blur-xl" 
                />
                <div 
                    style={{top: states[select][0], left: states[select][1], width: states[select][2], height: states[select][3]}}
                    className=" absolute rounded-full bg-white/20 pointer-events-none transition-all" 
                />
            </div>
            
            <div className=" h-[1px] absolute -bottom-[1px] w-4/5 z-20 left-8 bg-gradient-to-r from-transparent via-white/70 via-85% to-transparent" />

        </div>
    );
}
