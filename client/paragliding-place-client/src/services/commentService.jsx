import { requestFactory } from "./requester";

const baseUrl = `http://localhost:8000/api/place/comment`

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const places = Object.values(result);

        return places;
    };

    const getOne = async (commentId) => {
        const result = await request.get(`${baseUrl}/edit/${commentId}`);
        return result
    }

    const create = async (comment, placeId, userId, userName) => {
        let text = comment

        // This is place id
        let place_comment = placeId

        let user_id = userId
        let owner = userName

        const result = await request.post(baseUrl, { text, place_comment, user_id, owner });

        return result;
    };

    const edit = (commentId, data) => request.put(`${baseUrl}/edit/${commentId}`, data);

    // const deleteComment = async (commentId) => {
    //     const result = request.delete(`${baseUrl}/delete/${commentId}`);
    //     return result
    // }

    const deleteComment = async (commentId) => {
        await request.delete(`${baseUrl}/delete/${commentId}`);
    }

    // const deleteComment = (commentId) => request.delete(`${baseUrl}/delete/${commentId}`);

    return {
        getAll,
        getOne,
        create,
        edit,
        deleteComment
    };
}