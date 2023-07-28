import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../../hooks/useForm';
import { useCommentContext } from '../../../contexts/CommentContext';

import { limitColor } from '../../../utils/limitCommentColor';

import Button from 'react-bootstrap/Button';
import styles from "../commentComponents/comment.module.css";

export const EditCommentModal = ({
    onCommentEdit,
    data,
}) => {
    const { onCommentEditSubmit } = useCommentContext()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { values, changeHandler, onSubmit } = useForm({
        id: data.id,
        text: data.text,
        place_comment: data.place_comment,
        user_id: data.user_id,
        owner: data.owner,
    }, onCommentEditSubmit);

    const onEdit = () => {
        onCommentEdit(values);
        handleClose()
    }

    return (
        <>
            <button variant="info" className={styles.buttonEditComment} onClick={handleShow}>
                Edit
            </button>
            <Modal show={show} onHide={handleClose}>
                < div className={styles.createComment} >
                    <Button className={styles.closeButtonX} variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                    <label className={styles.labelComment}>Edit comment:</label>
                    <form className="form" method='POST' onSubmit={onSubmit}>
                        <textarea name="text" className={styles.textareaComment} placeholder="Comment......" defaultValue={data.text} onChange={changeHandler} maxLength="500"></textarea>
                        <div className={styles.textLimit}><div style={{color: limitColor(values.text)}}>Text limit: 500/{values.text.length}</div></div>
                        <input className={styles.btnSubmit} style={{ backgroundColor: "#7a7ef0" }} type="submit" value="Edit Comment" onClick={onEdit} />
                    </form>
                </div >
            </Modal>
        </>
    );
};