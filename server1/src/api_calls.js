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
    return {message: "ALL COMPONENTS TO BE FETCHED"};
}