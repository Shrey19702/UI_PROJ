import { get_all_categories, get_trending_component } from "../api_calls";
import ComponentTypes from "./ComponentTypes";
import TrendingComponent from "./TrendingComponent"
import { useLoaderData } from "react-router-dom";

export async function loader() {
    const category_data = await get_all_categories();
    const trending_data = await get_trending_component(5);
    return { category: category_data, trending: trending_data };
}

function Landing() {

    const data = useLoaderData();

    return (
        <>
            <div className="relative text-white w-full h-screen px-10 ">
                <div className=" py-48 lg:px-20 flex flex-col justify-center items-center lg:justify-start lg:items-start">
                    <div className=" text-center lg:text-start bg-clip-text text-transparent w-fit bg-gradient-to-r from-orange-500 to-violet-600 font-bold text-5xl lg:text-8xl">
                        UI COMPONENTS
                    </div>
                    <div className=" py-6 text-lg text-center lg:text-start">
                        Beautifully designed, expertly crafted components using TailwindCSS.<br /> The perfect starting point for your next project.
                    </div>
                </div>
                <div className=" absolute left-0 top-0 w-2/3 h-[160vh] bg-gradient-to-br from-blue-400/20 via-black/5 via-60%  to-black/5  " />
                <div className=" absolute left-0 top-0 w-full h-[160vh] bg-gradient-to-tl from-black/5 via-red-900/20 via-45%  to-black/5 " />
            </div>
            <TrendingComponent trending_data={data["trending"]} />
            <ComponentTypes category_data={data["category"]} />
        </>
    );
}

export default Landing;
