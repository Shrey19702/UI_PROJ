import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            <div className="bg-red-200/70  w-full h-72 text-center py-20">
                <div className="text-4xl m-5">
                    ERROR OCCURED
                </div>
                <div className="text-xl">
                    {error.statusText || error.message}
                </div>
            </div>
        </>
    );
}