export const placeReducer = (state, action) => {
    switch (action.type) {
        case 'PLACE_FETCH':
            return { ...action.payload }

        case 'COMMENT_DELETE':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            username: action.userName,
                            // email: action.userEmail,
                        }
                    }
                ],
            }

        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            username: action.userName,
                            // email: action.userEmail,
                        }
                    }
                ],
            }


        case 'RATING_ADD':
            return {
                ...state,
                rate: [
                    ...state.rate,
                    {
                        ...action.payload,
                        author: {
                            username: action.userName,
                            // email: action.userEmail,
                        }
                    }
                ],
            }

        default:
            return state;
    }
};