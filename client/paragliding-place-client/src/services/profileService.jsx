import { requestFactory } from "./requester";

const baseUrl = `http://localhost:8000/api/auth/profile`;

export const profileServiceFactory = (token) => {
    const request = requestFactory(token);

    // const getAll = async () => {
    //     const result = await request.get(baseUrl);
    //     const places = Object.values(result);
    
    //     return places;
    // };
    
    const getOne = async (userId) => {
        const result = await request.get(`${baseUrl}?id=${userId}`);
        // const user = Object.values(result)
        return result
    }
    

    // const edit = (userId, data) => request.put(`${baseUrl}/${userId}`, data);

    // const deletePlace = (userId) => request.delete(`${baseUrl}/delete/${userId}`);

    return {
        // getAll,
        getOne,
        // create,
        // edit,
        // delete: deletePlace,
    };
}