import { requestFactory } from "./requester";

const baseUrl = `http://localhost:8000/api/place`;

export const placeServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const places = Object.values(result);

        return places;

    };

    const getOne = async (placeId) => {
        try {
            const result = await request.get(`${baseUrl}/${placeId}`);
            return result

        } catch (error) {
            if (typeof(error) === "object")
            return "error"
        }
    }

    const create = async (placeData) => {
        const result = await request.post(baseUrl, placeData);

        // console.log(result);

        return result
    };

    const edit = (placeId, data) => request.put(`${baseUrl}/${placeId}`, data);

    const deletePlace = (placeId) => request.delete(`${baseUrl}/delete/${placeId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        delete: deletePlace,
    };
}