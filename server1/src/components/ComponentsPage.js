import { Link, useLoaderData } from "react-router-dom";
import { get_all_components } from "../api_calls";

// import { useState } from "react";

export async function loader() {
    const comps_data = await get_all_components();
    return { comps_data };
}

export default function ComponentsPage() {

    const { comps_data } = useLoaderData();
    return (
        <div className=" text-white py-32 text-lg">
            {/* {comps_data.message} */}
            <div className=" px-16 mx-16 py-10 flex flex-col gap-16 bg-gradient-to-tr from-fuchsia-700/70 to-orange-600/70 via-emerald-70 rounded-xl ">
                {
                    comps_data.map((ele, id) => (
                        <Link key={id} to={`http://localhost:3000/component/${ele._id}`}>

                            <div className="relative overflow-hidden group bg-stone-900/80 hover:bg-slate-900/80 p-5 pb-10 rounded-md shadow-xl hover:shadow-2xl transition-all duration-700" >
                                {/* <div>
                                    id: {ele._id}
                                </div> */}
                                {/* <div>
                                    link:  {`http://localhost:3000/component/${ele._id}`}
                                </div> */}
                                <div className=" relative z-10 text-3xl font-light py-5 transition-all">
                                    {ele.name}
                                </div>
                                <div className=" relative z-10 font-light pl-1 group-hover:pl-2 transition-all ">
                                    {ele.type === "REACT" ? "REACT" : "HTML"}
                                </div>
                                <div className="flex gap-5 pt-4">
                                    {ele.tags.map((tag, idx) => (
                                        <div key={idx} className=" z-10 px-3 pb-1 bg-amber-500 rounded-full  ">
                                            {tag}
                                        </div>
                                    ))}
                                </div>

                                <div className=" z-0 blur-2xl border-[40px] border-stone-900 group-hover:p-20  rounded-full h-[250%] w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute  duration-1000 " >
                                        <div className=" h-full w-full bg-stone-900 rounded-full group-hover:animate-pulse" />
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}