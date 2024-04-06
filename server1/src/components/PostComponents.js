import { useState } from 'react'
import { create_component } from '../api_calls';

export default function PostComponents() {
    const [tag_input, settag_input] = useState('');
    //form submition variables
    const [tags, settags] = useState([]);
    const [name, setname] = useState('');
    const [type, settype] = useState('JS');
    const [code, setcode] = useState('');
    const [category, setcategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const data = {
                name: name,
                type: type, 
                tags: tags,
                code: code,
                category: category
            };

            await create_component(data);
        }
        catch(err){
            console.error('Error: '+err);
        }
    }

    return (
        <>
            <div className=" text-white w-full h-fit py-24 px-10 bg-gradient-to-t from-orange-400/50 via-90% via-orange-900/50">
                <div className=' text-5xl font-bold mb-10 text-yellow-500' >Create New UI Element</div>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    {/* name */}
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-light">Element Name</div>
                        <input
                            required name="name" type="text"
                            className=" text-black outline-none p-2 rounded-sm sm:w-96"
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
                            className=" text-black outline-none p-2 rounded-sm sm:w-96"
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