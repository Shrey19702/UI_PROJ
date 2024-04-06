import { Link } from "react-router-dom";

import { ReactComponent as Pattern } from '../assets/trending-pattern.svg';

function TrendingComponent( {trending_data} ) {
    // console.log(trending_data)
    return (
        <div className=" relative text-white px-5 sm:px-10 py-10 bg-gradient-to-b from-red-900/5 via-red-900/70 via-30% to-blue-900/50  lg:bg-transparent overflow-hidden lg:overflow-visible ">

            <div className=" hidden lg:block absolute bottom-0 left-0 scale-x-50 lg:scale-x-100 w-full  aspect-[2/1] overflow-visible" >
                <Pattern/>
            </div>
            <div className="mb-10 relative z-10">
                <div className="text-3xl font-semibold mb-3">
                    Find inspiration from designers and developers across the globe.
                </div>
                <div className="text-md font-thin">
                    Browse and share work from world-class designers and developers in the front-end community.
                </div>
            </div>

            {/* TRENDING COMPONENTS : {trending_data ? trending_data.length: "not found"} */}
            
            { trending_data ?
                <>
                    <div className=" flex flex-wrap gap-5 justify-evenly bg-slate-400/40 py-10 px-2 rounded-xl transition-all duration-500 ">
                        {trending_data.map((val, idx)=>(
                            <div key={idx}>
                                <Link to={`/component/${val.element._id}`} >
                                    <div  className=" backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-4 max-w-96  bg-black/60 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105  ">
                                   
                                        <div className=" flex justify-between items-end pb-3">
                                            <span className="text-2xl"> {val.element.name} </span>
                                            {/* <br/> */}
                                            <span className="text-sm font-thin opacity-50"> {val.element.type==="JS"? "HTML": "REACT"} </span>
                                        </div>
                                   
                                        <div className="flex flex-wrap gap-2 items-center justify-evenly mt-4">
                                            {
                                                val.element.tags.map((tag, id)=>{ if(id>5) return(<></>); return (
                                                    <div className=" px-3 py-3 min-w-10 max-w-36 h-8 flex items-center justify-center overflow-clip bg-slate-950/70 rounded-xl " key={id}>
                                                        {tag}
                                                    </div>
                                                )})
                                            }
                                        </div>
                                        <div className="mt-5 mb-2 font-thin text-sm text-end opacity-70 ">
                                            Views : {val.views}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
                :
                <>
                    <div className=" text-center font-bold text-3xl py-20 ">
                        NO TRENDING COMPONENTS
                    </div>
                </>
            }
        </div>
    );
}

export default TrendingComponent;
