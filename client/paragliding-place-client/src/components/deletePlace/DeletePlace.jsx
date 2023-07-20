import React, { useEffect, useState, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useService } from '../../hooks/useService';
import { placeServiceFactory } from '../../services/placeService';

import { commentServiceFactory } from '../../services/commentService';
// import * as commentService from "../../services/commentService"

import { placeReducer } from '../../reducers/placeReducer';
import { usePlaceContext } from '../../contexts/PlaceContext';

import styles from './DeletePlace.module.css';

export const DeletePlace = () => {
    const { placeId } = useParams();
    const [show, setShow] = useState(false);
    const [place, dispatch] = useReducer(placeReducer, {});
    const placeService = useService(placeServiceFactory);
    const { deletePlace } = usePlaceContext();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const commentService = useService(commentServiceFactory)

    useEffect(() => {
        Promise.all([
            placeService.getOne(placeId),
            commentService.getAll(placeId),
        ]).then(([placeData, comments]) => {
            const placeState = {
                ...placeData,
                comments,
            };

            dispatch({ type: 'PLACE_FETCH', payload: placeState });
        });
    }, [placeId]);

    const onDeleteClick = async () => {
        await placeService.delete(place.id);

        // Comment delete
        const commentInDatabase = Object.keys(place.comments)
        for (let i = 0; i < commentInDatabase.length; i++) {
            let placeId = Object.values(place.comments)[i][['place_comment']]
            if (placeId === place.id) {
                let commentId = Object.values(place.comments)[i]['id']
                await commentService.deleteComment(parseInt(commentId))
            }
        }
        // Comment delete

        deletePlace(place.id);
        navigate('/');
    }

    return (
        <>
            <Link className='buttonDelete' variant="primary" onClick={handleShow}>
                <img className={styles.deletePlaceIcon} title="Delete" src="../../images/trash.png" alt="logo" />
            </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item {place.id} </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete <span style={{ color: 'rebeccapurple', fontSize: "15px", fontWeight: 'bold' }}>{place.place}?</span></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onDeleteClick}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}