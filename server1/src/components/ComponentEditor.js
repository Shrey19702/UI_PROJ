import { useLoaderData } from "react-router-dom";
import { get_component } from "../api_calls";
import { useState } from 'react'

export async function loader({ params }) {
    // console.log(params)
    const comp_data = await get_component(params.comp_Id);
    // console.log(comp_data.data);
    return { comp_data };
}

export default function ComponentsEditor() {
    //Get element data from params
    const { comp_data } = useLoaderData();

    const [tag_input, settag_input] = useState('');
    //form submition variables
    const [tags, settags] = useState(comp_data.data.tags);
    const [name, setname] = useState(comp_data.data.name);
    const [type, settype] = useState(comp_data.data.type);
    const [code, setcode] = useState(comp_data.data.code);
    const [category, setcategory] = useState(comp_data.data.category===null ? 'Uncategorised' : comp_data.data.category);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = `http://localhost:5000/api/update-element/${comp_data.data._id}`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    type: type, 
                    tags: tags,
                    code: code,
                    category: category
                })
            } 
            const response = await fetch(url , options);
            const responseData = await response.json();
            if(responseData.success){
                alert('Updated Sucessfully');
            }
            else{
                alert('Error Occured: '+responseData.message);
                console.error('Error: '+responseData.message);
            }
        }
        catch(err){
            console.error('Error: '+err);
        }
    }

    return (
        <>
            <div className=" text-white w-full h-fit py-24 px-10">
                <div className=' text-5xl font-bold mb-10 text-yellow-500' >Edit UI Element</div>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    {/* name */}
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-light">Element Name</div>
                        <input
                            required name="name" type="text"
                            className=" text-black outline-none p-2 rounded-sm w-96"
                            placeholder="NAME" value={name}
                            onChange={(e) => { setname(e.target.value) }}
                        />
                    </div>
                    {/* type */}
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-light">Element Type </div>
                        <select
                            className=" text-black outline-none p-2 rounded-sm w-72 "
                            name="name"
                            onChange={(e) => { settype(e.target.value) }}
                        >
                            <option value={'JS'}>
                                HTML BASED
                            </option>
                            <option value={'REACT'}>
                                REACT BASED
                            </option>
                        </select>
                    </div>
                    {/* tags */}
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-light">Element Tags :</div>
                        <div className=' flex gap-2 '>
                            {
                                tags.map((val, idx) => {
                                    return (
                                        <div key={idx} className=' flex items-center bg-lime-500 px-3 py-1 rounded-full'>
                                            {val}
                                            <span
                                                onClick={() => {
                                                    const newtag = tags.filter((val, index) => index !== idx)
                                                    settags(newtag);
                                                }}
                                                className='ml-1 p-1 font-thin hover:font-semibold cursor-pointer'>
                                                X
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex gap-5'>
                            <input
                                className=" text-black outline-none p-2 rounded-sm"
                                name="name" type="text" placeholder="TAG"
                                value={tag_input}
                                onChange={(e) => { settag_input(e.target.value) }}
                            />
                            <button
                                onClick={() => {
                                    if (tag_input !== '') {
                                        const repeat = tags.filter((val) => val === tag_input);
                                        if (repeat.length === 0) {
                                            settags([...tags, tag_input]);
                                            settag_input('');
                                        }
                                    }

                                }}
                                className=' bg-yellow-500 hover:bg-yellow-500/95 transition-all rounded-md p-2' type="button"
                            >ADD</button>
                        </div>
                    </div>
                    {/* category */}
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-light">Element Category</div>
                        <input
                            required name="name" type="text"
                            className=" text-black outline-none p-2 rounded-sm w-96"
                            placeholder="Category" value={category}
                            onChange={(e) => { setcategory(e.target.value) }}
                        />
                    </div>
                    {/* code */}
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-light">Element Code :</div>
                        <textarea onChange={(e) => { setcode(e.target.value) }} value={code} required className=" text-black outline-none p-2 rounded-sm" name="code" cols="30" rows="10"></textarea>
                    </div>
                    {/* submit */}
                    <div className='flex justify-center'>
                        <button type="submit" className=' transition-all bg-red-500 hover:bg-red-500/95 p-4 font-medium rounded-lg my-4 ' >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}