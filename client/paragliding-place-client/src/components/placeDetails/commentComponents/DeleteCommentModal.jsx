import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from "../commentComponents/comment.module.css";


export const DeleteCommentModal = ({ commentId, onCommentDelete }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = () => {
        onCommentDelete(commentId)
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
                    <Button variant="primary" onClick={onDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}