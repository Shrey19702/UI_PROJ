import { useLoaderData } from "react-router-dom";
import { get_all_components } from "../api_calls";

// import { useState } from "react";

export async function loader() {
    const comps_data = await get_all_components();
    return { comps_data };
}

export default function ComponentsPage() {

    const { comps_data } = useLoaderData();

    // console.log(comps_data)

    return (
        <div className=" text-white py-32 px-20 text-xl">
            {comps_data.message}
        </div>
    );
}