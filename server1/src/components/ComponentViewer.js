import { useLoaderData } from "react-router-dom";
import { get_component } from "../api_calls";
import { ResizableBox } from 'react-resizable'

import { useState } from "react";

export async function loader({ params }) {
    const comp_data = await get_component(params.comp_Id);
    return { comp_data };
}

function ResizeHandle({exp}){
    return (
        <div 
            className={` ${exp ? ' relative -left-36 h-full w-40  ': "" } overflow-hidden  `}
        />
    )
}

export default function ComponentViewer() {

    const { comp_data } = useLoaderData();
    const [exp, setexp] = useState(false);

    console.log(comp_data)

    return (
        <>
            <div className="bg-sky-200 text-4xl w-full h-72">
                Component_Viewer 
                <div> name: {comp_data.data.name}</div>
                <div> type: {comp_data.data.type}</div>
                <div> tags: {comp_data.data.tags.map((val)=>(val+" ,"))}</div>
                
            </div>
            <div className=" py-16 px-10 min-h-96 min-w-96 bg-yellow-50">
                <div className="  rounded-md   ">
                    <ResizableBox 
                        width={900} height={500} 
                        
                        minConstraints={[340, 340]} 
                        axis="x"
                        maxConstraints={[Infinity, Infinity]}
                        resizeHandles={['e']}
                        className=" w-full flex justify-center items-center "
                        handle={ 
                            <div 
                                onMouseEnter={()=>{setexp(true)}}
                                onMouseLeave={()=>{setexp(false)}}
                                
                                className=" w-3 h-[95%] rounded-e-md cursor-grab bg-black/80 " 
                            >
                                <ResizeHandle exp={exp} />
                            </div> 
                        }
                    >
                        <iframe
                            title={`component-${comp_data.id}`}
                            className=" w-full h-full rounded-md shadow-2xl bg-white"
                            src= {comp_data.link}
                        />
                    </ResizableBox>

                </div>
            </div>
        </>
    );
}