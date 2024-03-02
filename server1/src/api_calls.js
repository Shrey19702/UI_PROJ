export const get_component = async function (params = null) {
    if (params) {
        //  `http://localhost:5000/${element.type.toLowerCase()}/${element._id.toString()}`

        const response = await fetch(`http://localhost:5000/api/get-element/${params}`);
        const data = await response.json();

        console.log(data);
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