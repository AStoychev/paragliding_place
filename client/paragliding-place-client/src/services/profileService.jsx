import { requestFactory } from "./requester";

const baseUrl = `http://localhost:8000/api/auth/profile`;
const resetBaseUrl = `http://localhost:8000/api/auth/password_reset/`;

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


    const edit = (userId, data) => request.put(`${baseUrl}/edit/${userId}`, data);

    const changePassword = (userId, data) => request.put(`${baseUrl}/edit/change-password/${userId}`, data);

    const resetPassword = (email) => request.post(resetBaseUrl, email);

    const createNewPassword = (password, token) => request.post(`${resetBaseUrl}confirm/`, password, token);

    // const deletePlace = (userId) => request.delete(`${baseUrl}/delete/${userId}`);

    return {
        // getAll,
        getOne,
        // create,
        edit,
        changePassword,
        resetPassword,
        createNewPassword,
        // delete: deletePlace,
    };
}