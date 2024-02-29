export const get_component = async function (params = null) {
    if (params) {
        return { message: `Hello : ${params}` }
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