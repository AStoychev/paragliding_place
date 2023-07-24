import { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from 'react-router-dom';
import { commentServiceFactory } from "../services/commentService";

export const CommentContext = createContext();

export const CommentProvider = ({
    children,
}) => {

    // Try error
    const [errors, setErrors] = useState("")
    const catchServerError = (error, message) => {
        if (error) {
            setErrors(message)
            setTimeout(() => {
                setErrors("");
            }, 2500);
        }
    }
    // Try error
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
        try {
            const newComment = await commentService.create(text, placeId, userId, userName);
            setComment(state => [...state, newComment])
            navigate(`place-details/${placeId}/comments`)
        } catch (error) {
            catchServerError(error, "Something get wrong check for empty field ot try later!");
        }
    };

    const onCommentEditSubmit = async (values) => {
        try {
            const placeId = parseInt(values.place_comment);
            const result = await commentService.edit(values.id, values);
            setComment(state => state.map(x => x.id === values.id ? result : x))
            navigate(`place-details/${placeId}/comments`)
        } catch (error) {
            catchServerError(error, "Something get wrong check for empty field ot try later!");
        }
    };

    const removeComment = async (commentId) => {
        try {
            await commentService.deleteComment(commentId);
            setComment(state => state.filter(comment => comment.id !== commentId));
        } catch (error) {
            catchServerError(error, "Something get wrong plese try to delete comment later!")
        }
    }

    const constextValues = {
        comments,
        onCreateCommentSubmit,
        onCommentEditSubmit,
        removeComment,
        errors,
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