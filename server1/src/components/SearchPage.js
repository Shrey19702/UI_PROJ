import { useState } from "react";
import { search_components } from "../api_calls"
import { Link } from "react-router-dom";

export default function SearchPage() {
    const [prompt, setprompt] = useState('');
    const [res, setres] = useState(false)

    const handle_submit = async (e) => {
        e.preventDefault()
        setres(true)
        const res = await search_components(prompt)
        setres(res)
        // alert(prompt)
        // console.log(res)
    }
    return (
        <div className=" text-white text-lg overflow-hidden ">

            <form className={`relative ${typeof (res) === 'object' ? 'h-[50vh]' : 'h-screen'} mx-20 bg-red-50/7 transition-all duration-500`} onSubmit={handle_submit}>

                <div className="absolute blur-[175px] left-1/2 ">
                    <div className=" absolute top-24 left-1/2 -translate-x-1/2 bg-red-600/50 rounded-full h-96 w-96" />
                    <div className=" absolute top-64 left-1/2 -translate-x-80 bg-blue-600/50 rounded-full h-96 w-96 " />
                    <div className=" absolute top-64 left-1/2 -translate-x-12 bg-green-600/50 rounded-full h-96 w-96 " />
                </div>

                <div className={` relative ${typeof (res) === 'object' ? 'top-2/3' : 'top-1/2'} -translate-y-1/2  bg-red-500/508 py-10 transition-all duration-1000`} >
                    <div className=" relative left-1/2 -translate-x-1/2 w-fit ">
                        <input
                            type="text"
                            className=" relative font-light outline-none z-10 bg-white/30 py-2 px-3 pl-12 rounded-sm w-64 sm:w-[500px] backdrop-blur-sm"
                            value={prompt}
                            onChange={(e) => { setprompt(e.target.value) }}
                        />
                        <span className=" absolute left-2 top-1 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </span>
                    </div>

                    <button type="submit" className=" relative left-1/2 -translate-x-1/2  font-thin text-xl w-fit py-2 bg-slate-70 rounded-full px-5 my-3 flex gap-2 hover:gap-4 items-center justify-start transition-all duration-300">
                        Search
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>

            </form>

            {/* LOADING AND SEARCH RESULTS */}
            <div className=" relative z-10 ">
                <div className={` ${ res===true ? 'h-fit' : 'h-0' } overflow-hidden animate-bounce relative -top-20 text-2xl w-full text-center transition-all duration-500 `} >
                    Loading
                </div>

                <div className={` ${typeof (res) === 'object' ? 'h-fit py-8' : 'h-0' } overflow-hidden  px-16 rounded-xl sm:mx-10 mb-12 flex flex-col gap-8 transition-all duration-1000`}>
                    <div className=" text-3xl font-light my-2">
                        Search Results
                    </div>

                    { typeof (res) === 'object' && 
                        res.map((val, idx) => (
                            <Link to={`/component/${val.mongo_id}`} className=" cursor-pointer">
                                <div key={idx} className=" px-5 py-8 border-lime-300 bg-gradient-to-r from-sky-400/70 to-lime-300/70 rounded-md text-xl sm:text-2xl font-thin sm:hover:border-l-[50px] hover:border-transparent transition-all duration-300 ">
                                    {val.name}
                                </div>
                            </Link>
                        ))
                    }

                </div>

            </div>


        </div>
    );
}