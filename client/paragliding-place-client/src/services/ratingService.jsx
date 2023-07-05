import { requestFactory } from "./requester";

const baseUrl = `http://localhost:8000/api/place/rating`

export const ratingServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const rating = Object.values(result);

        return rating;
    };

    const create = async (rating, userName, userId, placeId) => {
        let owner = userName
        let place_id_rating = placeId
        let user_id = userId

        const result = await request.post(baseUrl, { rating, owner, place_id_rating, user_id });

        return result;
    };

    const deleteComment = (commentId) => request.delete(`${baseUrl}/delete/${commentId}`);

    return {
        getAll,
        create,
        deleteComment
    };
}