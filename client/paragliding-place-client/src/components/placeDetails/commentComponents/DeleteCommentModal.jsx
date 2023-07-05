import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useService } from "../../../hooks/useService";
import { commentServiceFactory } from "../../../services/commentService";
// import { useCommentContext } from '../../contexts/CommentContext';

import styles from "../commentComponents/comment.module.css";


export const DeleteCommentModal = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const {removeComment} = useCommentContext();

    const commentService = useService(commentServiceFactory)

    const onCommentDelete = async (commentId) => {
        await commentService.deleteComment(commentId);
        // removeComment(commentId);
        // const response = commentService.getAll()

        // dispatch({
        //     type: 'COMMENT_DELETE',
        //     payload: response,
        //     userName,
        //     userEmail,
        // })

        window.location.reload()

        handleClose()

    }

    return (
        <>
            <button variant="primary" className={styles.buttonDeleteComment} onClick={handleShow}>
                Delete
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you want to delete your comment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => onCommentDelete(props.deleteComment)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}