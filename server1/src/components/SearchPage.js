import { useState } from "react";

export default function SearchPage() {
    const [prompt, setprompt] = useState('');

    const handle_submit = (e)=>{
        e.preventDefault()
        alert('noice')
    }

    return (
        <div className=" text-white text-lg overflow-hidden">

            <form className="relative min-h-screen mx-20 flex justify-center items-center" onSubmit={handle_submit}>

                <div className="absolute blur-[175px] top-0  ">
                    <div className=" absolute top-24 left-1/2 -translate-x-1/2 bg-red-600/50 rounded-full h-96 w-96" />
                    <div className=" absolute top-64 left-1/2 -translate-x-80 bg-blue-600/50 rounded-full h-96 w-96 " />
                    <div className=" absolute top-64 left-1/2 -translate-x-12 bg-green-600/50 rounded-full h-96 w-96 " />
                </div>

                <div className="relative flex flex-col gap-6 items-center" >
                    <input
                        type="text"
                        className=" font-light outline-none relative z-10 bg-white/30 py-2 px-3 pl-12 rounded-sm w-64 sm:w-[500px] backdrop-blur-sm"
                        value={prompt}
                        onChange={(e) => { setprompt(e.target.value) }}
                    />
                    <span className="absolute z-10 top-[6px] left-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </span>

                    <button type="submit" className=" font-thin text-xl w-fit py-2 bg-slate-70 rounded-full px-5 flex gap-2 hover:gap-4 items-center justify-start transition-all duration-300">
                        Search
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </form>

        </div>
    );
}