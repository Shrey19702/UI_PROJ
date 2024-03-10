import { Outlet, useLoaderData } from "react-router-dom";
import { get_component } from "../api_calls";
import Navbar from "./Navbar"
import Footer from "./Footer";

export async function loader() {
    const component_data = await get_component();
    return { component_data };
}

export default function Root() {
    const {component_data} = useLoaderData();
    console.log(component_data)
    return (
        <>
            <Navbar/>
            <Outlet />
            <Footer/>
        </>
    );
}
