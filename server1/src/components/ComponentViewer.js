import { useLoaderData } from "react-router-dom";
import { get_component } from "../api_calls";
import { ResizableBox } from 'react-resizable'
import { Link } from "react-router-dom";

import { useEffect, useState } from 'react';

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

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

export default function ComponentViewer() {

    const { comp_data } = useLoaderData();
    const [exp, setexp] = useState(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [curr_window, setcurr_window] = useState(1); //1 -> visual, 2 -> code
    const [copycode, setcopycode] = useState(false); //false-> not copied, true->copied in last 3 seconds

    const code = comp_data.data.code.split("\n");

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        if(copycode){
            setTimeout(()=>{setcopycode(false)}, 3000);
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [code, copycode]);

    // console.log(comp_data);

    return (
        <div className=" pt-24 pb-16 sm:px-10 bg-gradient-to-t from-sky-400/50 via-90% via-sky-50/50 ">
            <div className=" relative overflow-hidden rounded-md my-5   bg-sky-100/40 ">
                <Pattern1 className=" absolute h-[200px] scale-x-[200%] scale-y-[250%]" />

                <div className=" relative z-10 w-full px-6 sm:px-12 py-6 font-light flex flex-col gap-5 ">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className=" text-3xl md:text-5xl">
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

            <div className=" mx-5 sm:mx-0 py-10 min-h-72 rounded-xl ">
                {/* TOP_BAR */}
                <div className="flex">
                    <div
                        onClick={() => {
                            if (curr_window === 2) {
                                setcurr_window(1)
                            }
                        }}
                        className={` ${curr_window === 1 ? 'bg-slate-600 border-b-4 border-b-sky-500 ' : 'bg-slate-700 hover:bg-slate-700/80'} transition-all cursor-pointer text-white font-thin px-5 py-2 w-fit  `}
                    >
                        VISUAL
                    </div>
                    <div
                        onClick={() => {
                            if (curr_window === 1) {
                                setcurr_window(2)
                            }
                        }}
                        className={` ${curr_window === 2 ? 'bg-slate-600 border-b-4 border-b-sky-500' : 'bg-slate-700 hover:bg-slate-700/80'} transition-all cursor-pointer text-white font-thin px-5 py-2 w-fit  `}
                    >
                        CODE
                    </div>
                </div>

                <div className=" flex flex-1 overflow-hidden">
                    {/* VISUAL */}
                    <div className={` ${curr_window === 1 ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden rounded-b-xl`}>
                        <ResizableBox
                            width={windowSize.innerWidth * 0.9} height={windowSize.innerHeight * 0.8}

                            minConstraints={[windowSize.innerWidth * 0.5 > 340 ? 340 : windowSize.innerWidth * 0.5, windowSize.innerHeight * 0.6]}
                            axis="x"
                            maxConstraints={[windowSize.innerWidth * 0.8 > 1300 ? 1300 : windowSize.innerWidth * 0.9, windowSize.innerHeight * 0.9]}
                            resizeHandles={['e']}
                            className=" w-full flex justify-center items-center "
                            handle={
                                <div
                                    onMouseEnter={() => { setexp(true) }}
                                    onMouseLeave={() => { setexp(false) }}

                                    className="w-3 h-[95%] min-w-3 rounded-e-md cursor-ew-resize bg-black/80 "
                                >
                                    <div className=" relative h-10 w-1 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full " />
                                    <ResizeHandle exp={exp} />
                                </div>
                            }
                        >
                            <iframe
                                title={`component-${comp_data.id}`}
                                className=" w-full h-full shadow-2xl bg-white"
                                src={`${process.env.REACT_APP_BASE_URL}${comp_data.link}`}
                            />
                        </ResizableBox>
                    </div>
                    {/* CODE */}
                    <div className={` ${curr_window === 2 ? 'w-full' : 'w-0'} relative transition-all duration-300 pt-3 bg-slate-900/75  overflow-hidden text-white rounded-b-xl`}>
                        {/* COPY BUTTON */}
                        <div 
                            onClick={ async ()=>{
                                try{
                                    await navigator.clipboard.writeText(comp_data.data.code);
                                    setcopycode(true);
                                }
                                catch(err){
                                    console.error('Failed to copy:', err);
                                }
                            }}
                            className=" absolute top-5 right-5 w-fit px-2 py-2 hover:scale-105 cursor-pointer bg-slate-50/10 rounded-md transition-all duration-300 " 
                        >
                            {/* COPY ANIMATION */}
                            <div className={` ${copycode? '' : 'hidden'} absolute top-16 -left-24 bg-slate-900 text-center font-light rounded-xl py-1 animate-bounce `}> COPIED TO CLIPBOARD </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </div>
                        {code.map((val, idx) => (
                            <div key={idx} className="px-2 min-w-96">
                                <span className=" select-none relative pr-2 pl-1  font-thin text-white/70">{idx + 1}</span> {val}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}