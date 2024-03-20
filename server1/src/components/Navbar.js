import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const states = {
    ////top left width height
    "Home": [8, 10, 72, 32],
    "Components": [8, 92, 118, 32],
    "Create": [8, 220, 72, 32],
    "Search": [8, 302, 75, 32],
}

export default function Navbar() {
    const [select, setselect] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if (location) {
            if (location.pathname === '/')
                setselect("Home")
            else if (location.pathname === '/components' || location.pathname.includes('/component/'))
                setselect("Components")
            else if (location.pathname === '/create')
                setselect("Create")
            else if (location.pathname === '/search')
                setselect("Search")
        }
    }, [select, location])
    return (
        <div className=" top-4 left-1/2 -translate-x-1/2 w-fit text-white backdrop-blur-md backdrop-brightness-50 bg-black/20 border border-white/50 rounded-full z-50 fixed shadow-inner">

            <div className=" h-[1px] absolute -top-[1px] w-4/5 z-20 left-8 bg-gradient-to-r from-transparent via-white/70 via-30% to-transparent" />

            <div className=" px-4 relative flex overflow-hidden rounded-full p-1 gap-5 font-semibold ">
                <Link to={'/'}>
                    <div
                        className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Home" ? 'text-white' : 'text-white/70'} relative cursor-pointer transition-all `}
                        onClick={() => { setselect("Home") }}
                    >
                        Home
                    </div>
                </Link>
                <Link to={'/components'}>
                    <div
                        className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Components" ? 'text-white' : 'text-white/70'} relative cursor-pointer transition-all `}
                        onClick={() => { setselect("Components") }}
                    >
                        Components
                    </div>
                </Link>
                <Link to={'/create'}>
                    <div
                        className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Create" ? 'text-white' : 'text-white/70'} relative cursor-pointer transition-all `}
                        onClick={() => { setselect("Create") }}
                    >
                        Create
                    </div>
                </Link>
                <Link to={'/search'}>
                    <div
                        className={` select-none p-2 rounded-full border-0 bg-transparent hover:text-white ${select === "Search" ? 'text-white' : 'text-white/70'} relative cursor-pointer transition-all `}
                        onClick={() => { setselect("Search") }}
                    >
                        Search
                    </div>
                </Link>

                <div
                    style={{ top: states[select][0], left: states[select][1] + 10, width: states[select][2] - 10, height: states[select][3] }}
                    className=" bg-white/80 rounded-full absolute blur-xl"
                />
                <div
                    style={{ top: states[select][0], left: states[select][1], width: states[select][2], height: states[select][3] }}
                    className=" absolute rounded-full bg-white/20 pointer-events-none transition-all"
                />
            </div>

            <div className=" h-[1px] absolute -bottom-[1px] w-4/5 z-20 left-8 bg-gradient-to-r from-transparent via-white/70 via-85% to-transparent" />

        </div>
    );
}
