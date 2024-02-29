import { Outlet, Link, useLoaderData } from "react-router-dom";
import { get_component } from "../api_calls";

export async function loader() {
    const component_data = await get_component();
    return { component_data };
}

export default function Root() {
    const {component_data} = useLoaderData();

    return (
        <>
            <div className="bg-yellow-200 flex  justify-start p-5 gap-10">
                <div>{`${component_data.message}`}</div>
                <div>Links:--</div>
                <div>
                    <Link to={'component/1'}>
                        1. COMPONENT 1
                    </Link>
                </div>
                <div>
                    <Link to={'component/2'}>
                        2. COMPONENT 2
                    </Link>
                </div>
                <div>
                    <Link to={'/'}>
                        3. HOME
                    </Link>
                </div>
            </div>
            <Outlet />
            {/* {`${component_data.message}`} */}
        </>
    );
}
