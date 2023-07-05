import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { useForm } from "../../../hooks/useForm";

import styles from "../commentComponents/comment.module.css";

export const CommentModal = ({
    onCommentSubmit,
}) => {

    const { placeId } = useParams();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { values, changeHandler, onSubmit } = useForm({
        text: '',
    }, onCommentSubmit);
    return (
        <>
            <Button className={styles.buttonCreateComment} variant="info" onClick={handleShow}>
                Add Comment
            </Button>
            <Modal show={show} onHide={handleClose}>
                < article className="create-comment" >
                    <Button className='closeButtonX' variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onSubmit}>
                        <textarea name="text" placeholder="Comment......" value={values.text} onChange={changeHandler}></textarea>
                        <input className="btn submit" style={{ backgroundColor: "#7a7ef0" }} type="submit" value="Add Comment" onClick={handleClose}/>
                    </form>
                </article >
            </Modal>
        </>
    );
};