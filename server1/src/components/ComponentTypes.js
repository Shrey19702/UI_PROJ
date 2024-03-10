import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ name }) {
    const [val, setval] = useState([0, 0]);

    const handleMove = (e) => {
        let rect = e.target.getBoundingClientRect();

        const centerX = 192 + rect.x;
        const centerY = 40 + rect.y;

        let newX = (e.clientX - centerX);
        let newY = (e.clientY - centerY);

        if (newX < (rect.left - centerX) || newX > (rect.right - centerX)) {
            return;
        }
        if (newY < (rect.top - centerY) || newY > (rect.bottom - centerY)) {
            return;
        }
        setval([newX, newY])
    }
    return (
        <div onMouseMove={handleMove}>
            <div className="w-96 h-20 bg-transparent block absolute z-10 rounded-xl " />
            <div className=" relative overflow-hidden border border-stone-600 bg-zinc-700/50 h-20 w-96 flex items-center justify-center rounded-xl">
                <div>{name}</div>
                <div style={{ "transform": `translate(${val[0]}px, ${val[1]}px)` }} className={`h-20 w-32 bg-gradient-to-t from-black/50 via-slate-50/50  to-black/50 relative blur-2xl  `} />
            </div>
        </div>
    )
}

function ComponentTypes() {
    return (
        <>
            <div className=" bg-black/70 min-h-screen text-slate-200 px-6 py-24 relative overflow-hidden">

                <div className=" bg-gradient-to-r from-slate-50 via-zinc-600 -600 to-slate-100 h-[1px] w-screen absolute top-0 left-0 " />

                <div className="text-4xl font-semibold px-16 ">
                    Many professionally designed, responsive components to use
                </div>
                <div className=" mt-8 mx-20 px-5 py-3 rounded-xl  w-fit">
                    <Link to={"/components"}>
                        <span className=" text-yellow-200 flex items-center justify-center gap-3 transition-all text-xl opacity-80 hover:opacity-100">
                            Browse All Components
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </span>

                    </Link>
                </div>

                <div className=" flex py-10 gap-10 flex-wrap items-center justify-evenly font-medium text-2xl">
                    <Card name={"Navbar"} />
                    <Card name={"Sidebars"} />
                    <Card name={"Tables"} />
                    <Card name={"Forms"} />
                    <Card name={"Headings"} />
                    <Card name={"Footers"} />

                    <Card name={"Reviews"} />
                    <Card name={"Carts"} />
                    <Card name={"Buttons"} />
                    <Card name={"Dropdowns"} />
                    <Card name={"Combobox"} />

                    <Card name={"Notifications"} />
                    <Card name={"Dialogs"} />

                    <Card name={"Breadcrumbs"} />
                    <Card name={"Tabs"} />
                    <Card name={"Pagination"} />
                    <Card name={"Alerts"} />

                    <Card name={"404 Pages"} />
                    <Card name={"banners"} />


                </div>
            </div>

        </>
    );
}

export default ComponentTypes;
