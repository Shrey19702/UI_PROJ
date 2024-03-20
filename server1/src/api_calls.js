export const get_component = async function (params = null) {
    if (params) {
        //  `http://localhost:5000/${element.type.toLowerCase()}/${element._id.toString()}`

        const response = await fetch(`http://localhost:5000/api/get-element/${params}`);
        const data = await response.json();

        // console.log(data);
        return data;
    }
    return {
        message: "Hello root",
        id: params
    }
}

export async function get_ComponentViewer() {
    // code to fecth component data here
    return (<>HI</>);
}

export const get_all_components_by_categories = async function(){
    try{
        const response = await fetch(`http://localhost:5000/get-elements-by-category/`);
        const json_res = await response.json();

        // console.log(json_res);
        if(json_res.success){
            return json_res.data;
        }
        else{
            console.error(json_res.message)
            return [];
        }
    }
    catch(err){
        console.log('error in fetching all elements')
    }
    // return {message: "ALL COMPONENTS TO BE FETCHED"};
}

export const get_all_components = async function(){
    try{
        const response = await fetch(`http://localhost:5000/get-all-elements/`);
        const json_res = await response.json();

        // console.log(json_res);
        if(json_res.success){
            return json_res.data;
        }
        else{
            console.error(json_res.message)
            return [];
        }
    }
    catch(err){
        console.log('error in fetching all elements')
    }
    // return {message: "ALL COMPONENTS TO BE FETCHED"};
}

export const get_all_categories = async function(){
    try{
        const response = await fetch(`http://localhost:5000/get-all-categories/`);
        const json_res = await response.json();

        // console.log(json_res);
        if(json_res.success){
            return json_res.data;
        }
        else{
            console.error(json_res.message)
            return [];
        }
    }
    catch(err){
        console.log('error in fetching all elements')
    }
}

export const search_components = async function(params){
    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                k: 4,
                prompt: params
            })
        };
        const response = await fetch(`http://localhost:5001/recommend`, options);
        const json_res = await response.json();

        // console.log(json_res);
        if(json_res.success){
            return json_res.data;
        }
        else{
            console.error(json_res.message)
            return [];
        }
    }
    catch(err){
        console.log('error in fetching all elements')
    }
    // return {message: "ALL COMPONENTS TO BE FETCHED"};
}