export default function Footer() {
    return (
        <div className="  text-white h-40 relative overflow-hidden">
            <div className=" absolute w-screen h-[1px] bg-gradient-to-r from-slate-600 via-neutral-400 via-70% to-neutral-700" />
            <div className="flex flex-col justify-center items-center h-full">
                <div className=" text-3xl font-bold bg-clip-text text-transparent w-fit bg-gradient-to-r from-orange-500 to-violet-600 ">
                    UI COMPONENTS
                </div>
                <div className=" font-thin p-3">
                    ©2024 Shrey19702 All rights reserved.
                </div>
                <div className="font-thin flex gap-10 ">
                    <a target="_blank" className=" text-slate-200 hover:text-slate-50" href="https://github.com/shrey19702" rel="noreferrer">Github</a>
                    <span>|</span>
                    <a target="_blank" className=" text-slate-200 hover:text-slate-50" href="https://LinkedIn/shrey19702" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
        </div>
    );
}
