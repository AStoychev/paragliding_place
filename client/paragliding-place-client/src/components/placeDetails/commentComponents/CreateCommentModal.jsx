import React, { useState } from 'react';

import { limitColor } from '../../../utils/limitCommentColor';

import { useForm } from "../../../hooks/useForm";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from "../commentComponents/comment.module.css";

export const CommentModal = ({
    onCommentSubmit,
}) => {

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
                < div className={styles.createComment} >
                    <Button className={styles.closeButtonX} variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                    <label className={styles.labelComment}>Add new comment:</label>
                    <form className="form" onSubmit={onSubmit}>
                        <textarea name="text" className={styles.textareaComment} placeholder="Comment......" value={values.text} onChange={changeHandler} maxLength="500"></textarea>
                        <div className={styles.textLimit}><div style={{ color: limitColor(values.text) }}>Text limit: 500/{values.text.length}</div></div>
                        <input className={styles.btnSubmit} style={{ backgroundColor: "#7a7ef0" }} type="submit" value="Add Comment" onClick={handleClose} />
                    </form>
                </div>
            </Modal>
        </>
    );
};