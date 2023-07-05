import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../../hooks/useForm';

import { commentServiceFactory } from '../../../services/commentService';
import { useCommentContext } from '../../../contexts/CommentContext';
import { useService } from '../../../hooks/useService';

import Button from 'react-bootstrap/Button';


import styles from "../commentComponents/comment.module.css";

export const EditCommentModal = (props) => {
    const { onCommentEditSubmit } = useCommentContext()
    const commentService = useService(commentServiceFactory)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let editCommentId = props.editCommentId

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        id: '',
        text: '',
        place_comment: '',
        user_id: '',
        owner: '',
    }, onCommentEditSubmit);

    useEffect(() => {
        commentService.getOne(editCommentId)
            .then(result => {
                changeValues(result);
            });
    }, [editCommentId])

    const editComment = async (values) => {
        const response = await commentService.edit(editCommentId, values.text);

        // dispatch({
        //     type: 'COMMENT_ADD',
        //     payload: response,
        //     userName,
        //     userEmail,
        // })
    };


    return (
        <>
            <Button className={styles.buttonEditComment} variant="info" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                < article className="create-comment" >
                    <Button className='closeButtonX' variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                    <label>Edit comment:</label>
                    <form className="form" method='POST' onSubmit={onSubmit}>
                        <textarea name="text" placeholder="Comment......" value={values.text} onChange={changeHandler}></textarea>
                        <input className="btn submit" style={{ backgroundColor: "#7a7ef0" }} type="submit" value="Add Comment" onClick={handleClose} />
                    </form>
                </article >
            </Modal>
        </>
    );
};