export const get_component = async function (params = null) {
    if (params) {
        //  `http://localhost:5000/${element.type.toLowerCase()}/${element._id.toString()}`

        const response = await fetch(`${process.env.REACT_APP_EXPRESS_API_URI}/api/get-element/${params}`);
        const data = await response.json();

        // console.log(data);
        return data;
    }
    return {
        message: "Issue",
        id: params,
        success: false
    }
}

export async function get_ComponentViewer() {
    // code to fecth component data here
    return (<>HI</>);
}

export const get_all_components_by_categories = async function () {
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_API_URI}/get-elements-by-category/`);
        const json_res = await response.json();

        // console.log(json_res);
        if (json_res.success) {
            return json_res.data;
        }
        else {
            console.error(json_res.message)
            return [];
        }
    }
    catch (err) {
        console.log('error in fetching all elements')
    }
    // return {message: "ALL COMPONENTS TO BE FETCHED"};
}

export const get_all_components = async function () {
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_API_URI}/get-all-elements/`);
        const json_res = await response.json();

        // console.log(json_res);
        if (json_res.success) {
            return json_res.data;
        }
        else {
            console.error(json_res.message)
            return [];
        }
    }
    catch (err) {
        console.log('error in fetching all elements')
    }
    // return {message: "ALL COMPONENTS TO BE FETCHED"};
}

export const get_all_categories = async function () {
    console.log(process.env.FLASK_API_URI);
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_API_URI}/get-all-categories/`);
        const json_res = await response.json();

        // console.log(json_res);
        if (json_res.success) {
            return json_res.data;
        }
        else {
            console.error(json_res.message)
            return [];
        }
    }
    catch (err) {
        console.error('error in fetching all elements')
    }
}

export const search_components = async function (params) {
    try {
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
        const response = await fetch(`${process.env.REACT_APP_FLASK_API_URI}/recommend`, options);
        const json_res = await response.json();

        // console.log(json_res);
        if (json_res.success) {
            return json_res.data;
        }
        else {
            console.error(json_res.message)
            return [];
        }
    }
    catch (err) {
        console.log('error in fetching all elements')
    }
    // return {message: "ALL COMPONENTS TO BE FETCHED"};
}

export const update_component = async (data, id)=>{
    try {
        console.log(data)
        const url = `${process.env.REACT_APP_EXPRESS_API_URI}/api/update-element/${id}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
        return err
    }

}