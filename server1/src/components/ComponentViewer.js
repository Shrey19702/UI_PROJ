import { useLoaderData } from "react-router-dom";
import { get_component } from "../api_calls";
import { ResizableBox } from 'react-resizable'
import { Link } from "react-router-dom";

import { useState } from "react";

import { ReactComponent as Pattern1 } from '../assets/pattern1.svg';

export async function loader({ params }) {
    const comp_data = await get_component(params.comp_Id);
    return { comp_data };
}

function ResizeHandle({ exp }) {
    return (
        <div
            className={` ${exp ? ' relative -left-36 h-full w-40  ' : ""} overflow-hidden  `}
        />
    )
}

export default function ComponentViewer() {

    const { comp_data } = useLoaderData();
    const [exp, setexp] = useState(false);

    // console.log(comp_data)

    return (
        <div className=" pt-24 pb-16 px-10 bg-gradient-to-t from-sky-400/50 via-90% via-sky-50/50 ">
            <div className=" relative overflow-hidden rounded-md my-5   bg-sky-100/40 ">
                <Pattern1 className=" absolute h-[200px] scale-x-[200%] scale-y-[250%]" />

                <div className=" relative z-10 w-full px-12 py-6 font-light flex flex-col gap-5 ">
                    <div className="flex justify-between items-center">
                        <div className=" text-5xl"> 
                            {comp_data.data.name.toUpperCase()}
                        </div>
                        <div className=" text-xl hover:border-b-8 hover:border-b-transparent border-b-0 border-b-transparent transition-all"> 
                            <Link to={`/components#${comp_data.data.category}`}> 
                                {comp_data.data.category.toUpperCase()}
                            </Link>
                        </div>
                    </div>
                    <div className="text-xl "> {comp_data.data.type === "REACT" ? "REACT" : "HTML"}</div>
                    <div className="flex gap-5 flex-wrap">
                        {comp_data.data.tags.map((val, idx) => (
                            <div key={idx} className="bg-slate-100 px-3 pb-2 pt-1 rounded-full text-center">
                                {val}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" py-10 px-10 min-h-96 ">
                <div className="  rounded-md   ">
                    <ResizableBox
                        width={1300} height={500}

                        minConstraints={[340, 100]}
                        axis="x"
                        maxConstraints={[1300, 1000]}
                        resizeHandles={['e']}
                        className=" w-full flex justify-center items-center "
                        handle={
                            <div
                                onMouseEnter={() => { setexp(true) }}
                                onMouseLeave={() => { setexp(false) }}

                                className=" w-3 h-[95%] rounded-e-md cursor-ew-resize bg-black/80 "
                            >
                                <div className=" relative h-10 w-1 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full " />
                                <ResizeHandle exp={exp} />
                            </div>
                        }
                    >
                        <iframe
                            title={`component-${comp_data.id}`}
                            className=" w-full h-full rounded-md shadow-2xl bg-white"
                            src={comp_data.link}
                        />
                    </ResizableBox>

                </div>
            </div>
        </div>
    );
}