import { useState } from 'react'

export default function PostComponents() {
    const [tag_input, settag_input] = useState('');
    //form submition variables
    const [tags, settags] = useState([]);
    const [name, setname] = useState('');
    const [type, settype] = useState('JS');
    const [code, setcode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:5000/api/create-element"
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    type: type, 
                    tags: tags,
                    code: code
                })
            } 
            const response = await fetch(url , options);
            const responseData = await response.json();
            if(responseData.success){
                alert('submitted sucessfully');
            }
            else{
                alert('error occured: '+responseData.message);
                console.error('Error: '+responseData.message);
            }
        }
        catch(err){
            console.error('Error: '+err);
        }
    }

    return (
        <>
            <div className=" text-white w-full h-fit py-5 px-10">
                <form onSubmit={handleSubmit}>
                    {/* name */}
                    <div className="flex gap-5 items-center my-2">
                        <div className="text-xl">Element Name :</div>
                        <input
                            required name="name" type="text"
                            className=" text-black outline-none p-2 rounded-sm w-96"
                            placeholder="NAME" value={name}
                            onChange={(e) => { setname(e.target.value) }}
                        />
                    </div>
                    {/* type */}
                    <div className="flex gap-5 items-center my-2">
                        <div className="text-xl">Element Type :</div>
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
                    <div className="flex flex-col gap-5 my-2">
                        <div className="text-xl">Element Tags :</div>
                        <div className=' flex gap-2 '>
                            {
                                tags.map((val, idx) => {
                                    return (
                                        <div key={idx} className=' flex items-center bg-lime-400 px-3 py-1 rounded-full'>
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
                                className=' bg-yellow-300 rounded-md p-2' type="button"
                            >ADD</button>
                        </div>
                    </div>
                    {/* code */}
                    <div className="flex flex-col my-2 gap-3">
                        <div className="text-xl">Element Code :</div>
                        <textarea onChange={(e) => { setcode(e.target.value) }} value={code} required className=" text-black outline-none p-2 rounded-sm" name="code" cols="30" rows="10"></textarea>
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" className=' transition-all bg-red-400 hover:bg-red-500 p-4 font-medium rounded-lg my-4 ' >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}