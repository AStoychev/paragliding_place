import { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from 'react-router-dom';
import { commentServiceFactory } from "../services/commentService";

export const CommentContext = createContext();

export const CommentProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [comments, setComment] = useState([]);
    const commentService = commentServiceFactory(); //auth.accessToken

    useEffect(() => {
        commentService.getAll()
            .then(result => {
                setComment(result)
            })
    }, []);

    const onCreateCommentSubmit = async (text, placeId, userId, userName) => {
        const newComment = await commentService.create(text, placeId, userId, userName);

        setComment(state => [...state, newComment])

        navigate(`place-details/${placeId}`)
    };

    const onCommentEditSubmit = async (values) => {
        const placeId = parseInt(values.place_comment);

        const result = await commentService.edit(values.id, values);

        setComment(state => state.map(x => x.id === values.id ? result : x))

        navigate(`place-details/${placeId}`)
    };

    const removeComment = async (commentId) => {
        await commentService.deleteComment(commentId)
        setComment(state => state.filter(comment => comment.id !== commentId))
    }

    // const getComment = (commentId) => {
    //     return comments.find(comment => comment._id === commentId);
    // };

    const constextValues = {
        comments,
        onCreateCommentSubmit,
        onCommentEditSubmit,
        removeComment,
        // getComment,
    };

    return (
        <CommentContext.Provider value={constextValues}>
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => {
    const context = useContext(CommentContext);

    return context;
};