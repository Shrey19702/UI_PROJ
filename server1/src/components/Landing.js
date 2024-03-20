import { get_all_categories } from "../api_calls";
import ComponentTypes from "./ComponentTypes";

import { useLoaderData } from "react-router-dom";

export async function loader() {
    const category_data = await get_all_categories();
    return { category_data };
}

function Landing() {

    const { category_data } = useLoaderData();

    return (
        <>
            <div className="relative text-white w-full h-screen px-10 ">
                <div className=" py-48 px-20 flex flex-col justify-center items-center lg:justify-start lg:items-start">
                    <div className=" text-center lg:text-start bg-clip-text text-transparent w-fit bg-gradient-to-r from-orange-500 to-violet-600 font-bold text-8xl">
                        UI COMPONENTS
                    </div>
                    <div className=" py-6 text-lg text-center lg:text-start">
                        Beautifully designed, expertly crafted components using TailwindCSS.<br /> The perfect starting point for your next project.
                    </div>
                </div>
                <div className=" absolute left-0 top-0 w-2/3 h-[100vh] bg-gradient-to-r from-blue-400/20  to-black/5  " />
                <div className=" absolute left-0 top-0 w-full h-[100vh] bg-gradient-to-t from-red-900/20  to-black/5 " />
            </div>
            <ComponentTypes category_data={category_data} />
        </>
    );
}

export default Landing;
