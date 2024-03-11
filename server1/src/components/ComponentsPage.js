import { Link, useLoaderData } from "react-router-dom";
import { get_all_components } from "../api_calls";

// import { useState } from "react";

export async function loader() {
    const comps_data = await get_all_components();
    return { comps_data };
}

export default function ComponentsPage() {

    const { comps_data } = useLoaderData();
    return (
        <div className=" text-white py-32 px-20 text-xl">
            {/* {comps_data.message} */}
            {
                comps_data.map((ele)=>(
                <div className="mb-20">
                    <div>
                        name: {ele.name}
                    </div>
                    <div>
                        id: {ele._id}
                    </div>
                    <div>
                        type: {ele.type}
                    </div>
                    <div>
                        tags: {ele.tags.map((tag, idx)=>(
                            <>
                                {tag}&nbsp;
                            </>
                        ))}
                    </div>
                    <div>
                        link: <Link to={`http://localhost:3000/component/${ele._id}`} > {`http://localhost:3000/component/${ele._id}`} </Link>
                    </div>
                    
                </div>
                ))
            }
        </div>
    );
}