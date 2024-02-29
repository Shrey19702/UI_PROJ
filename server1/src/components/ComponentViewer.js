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
            className={` ${exp ? ' relative -left-36 h-full w-40  ': 'w-0' } overflow-hidden  `}
        />
    )
}

export default function ComponentViewer() {

    const { comp_data } = useLoaderData();
    const [exp, setexp] = useState(false);

    return (
        <>
            <div className="bg-sky-200 text-4xl w-full h-72">
                Component_Viewer {comp_data.message}
            </div>
            <div className=" py-16 px-10 min-h-96 min-w-96 bg-yellow-50">
                <div className=" bg-green-300 rounded-md overflow-hidden ">
                    <ResizableBox 
                        width={1200} height={500} 
                        
                        minConstraints={[340, 340]} 
                        axis="x"
                        maxConstraints={[Infinity, Infinity]}
                        resizeHandles={['e']}
                        className=" flex"
                        handle={ 
                            <div 
                                onMouseEnter={()=>{setexp(true)}}
                                onMouseLeave={()=>{setexp(false)}}
                                
                                className=" w-5 cursor-grab bg-black " 
                            >
                                <ResizeHandle exp={exp} />
                            </div> 
                        }
                    >
                        <iframe
                            title={`component-${comp_data.id}`}
                            className=" w-full h-full"
                            src="http://bing.com"

                        />
                    </ResizableBox>

                </div>
            </div>
        </>
    );
}