import { useState } from "react";
import { Link } from "react-router-dom";

function Card({name }) {
    const [val, setval] = useState([0, 0]);

    const handleMove = (e) => {
        let rect = e.target.getBoundingClientRect();

        const centerX = 192 + rect.x;
        const centerY = 40 + rect.y;

        //position of mouse relative to center
        let newX = (e.clientX - centerX);
        let newY = (e.clientY - centerY);

        setval([newX, newY])
    }
    return (
        <div onMouseMove={handleMove} >
            <Link to={`/components#${name}`} className=" w-72 sm:w-96 h-20 bg-transparent block absolute z-20 rounded-xl cursor-pointer " />
            <div className=" relative overflow-hidden border border-stone-600 bg-zinc-700/50 h-20 w-72 sm:w-96  rounded-xl">
                <div className="h-full w-full text-center py-5 relative  z-10 select-none ">{name}</div>
                {/* <div style={{ "transform": `translate(${val[0]}%, ${val[1]}%)` }} className={`h-20 w-52 bg-white relative   `} /> */}
                <div style={{ "left": `${val[0]}px`, "top": `${val[1]}px` }} className={`h-20 w-1/2 bg-white relative -translate-y-full translate-x-1/2 blur-3xl flex opacity-40`}>
                    <div style={{"backgroundColor": val[0]>2 ? "rgb(10, 10, 200)": "rgb(200, 200, 10)"}} className=" w-1/2 h-20 transition-all duration-200" />
                    <div style={{"backgroundColor": val[1]>2 ? "rgb(10, 200, 10)": "rgb(200, 10, 10)" }} className=" w-1/2 h-20 transition-all duration-200" />
                </div>

            </div>
        </div>
    )
}

function ComponentTypes({category_data}) {

    return (
        <>
            <div className=" bg-black/70 min-h-screen text-slate-200 px-6 py-24 relative overflow-hidden">

                <div className=" bg-gradient-to-r from-slate-50 via-zinc-600 -600 to-slate-100 h-[1px] w-screen absolute top-0 left-0 " />

                <div className=" text-xl sm:text-4xl font-semibold px-5 md:px-16 ">
                    Many professionally designed, responsive components to use
                </div>
                <div className=" mt-8 mx-10 sm:mx-20 sm:px-5 py-3 rounded-xl  w-fit">
                    <Link to={"/components"}>
                        <span className=" text-yellow-200 flex items-center justify-center gap-3 transition-all text-xl opacity-80 hover:opacity-100">
                            Browse All Components
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </span>
                    </Link>
                </div>

                <div className=" flex py-10 gap-10 flex-wrap items-center justify-evenly font-medium text-2xl">
                    {   typeof(category_data)!=='object' || (typeof(category_data)==='object' && category_data.length===0) ? 
                        <div className=" text-center text-3xl font-bold ">
                            NO CATEGORIES
                        </div>
                        :
                        category_data.map((val, idx)=>(
                            <Card key={idx} name={val} />
                        ))
                    }
                </div>
            </div>

        </>
    );
}

export default ComponentTypes;
