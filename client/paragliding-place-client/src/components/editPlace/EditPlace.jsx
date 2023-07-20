import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlaceContext } from '../../contexts/PlaceContext';
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { placeServiceFactory } from '../../services/placeService';

import { DeletePlace } from '../deletePlace/DeletePlace'

import { checkButtonDirections } from '../../constants/constants';

import styles from '../createPlace/CreateEditNewPlace.module.css';

export const EditPlace = () => {
    const { onPlaceEditSubmit } = usePlaceContext();
    const { placeId } = useParams();
    const placeService = useService(placeServiceFactory);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        id: '',
        place: '',
        latitude_takes_off: '',
        longitude_takes_off: '',
        latitude_landing: '',
        longitude_landing: '',
        description: '',
        direction: {
            e: false,
            es: false,
            ees: false,
            en: false,
            een: false,
            ene: false,
            ese: false,
            w: false,
            ws: false,
            wws: false,
            wn: false,
            wwn: false,
            wnw: false,
            wsw: false,
            n: false,
            nw: false,
            nnw: false,
            ne: false,
            nne: false,
            nwn: false,
            nen: false,
            s: false,
            sw: false,
            ssw: false,
            se: false,
            sse: false,
            sws: false,
            ses: false,
        },
    }, onPlaceEditSubmit);

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        placeService.getOne(placeId)
            .then(result => {
                changeValues(result);
            });
    }, [placeId])

    const [directions, setDirections] = useState({});

    const onRatingChange = (e) => {
        values.difficulty_level = rating
    }

    const onDirectionsChange = (e) => {
        values.direction[e.target.value] = e.target.checked


        setDirections(state => ({ ...state, [e.target.value]: e.target.checked }));

        let len = Object.keys(values.direction).length
    }

    return (
        <div className={styles.container}>
            <section id={styles.createPlace} className="content auth">
                <form method='POST' onSubmit={onSubmit}>
                    <div className={styles.threeColumnsGrid}>
                        <div className={styles.leftSide}></div>
                        <div className={styles.rightSide}>
                            <h3 className={styles.header}>Edit Place or <DeletePlace /></h3>

                            <label className={styles.placeLabel} htmlFor="place">Place Name</label>
                            <input
                                className={styles.inputName}
                                onChange={changeHandler}
                                type="place"
                                id="place"
                                name="place"
                                value={values.place}
                            />

                            <table className={styles.tablePosition} >

                                <tbody>
                                    <tr>
                                        <th className={styles.tableDiffernt}>
                                            <label htmlFor="latitude_takes_off" className={styles.labelDirection}>Latitute&nbsp;Launch</label>
                                            <input
                                                className={styles.inputDirection}
                                                value={values.latitude_takes_off}
                                                onChange={changeHandler}
                                                type="number"
                                                name="latitude_takes_off"
                                                id="latitude_takes_off"
                                                placeholder="0.00"
                                            />
                                        </th>
                                        <th>
                                            <label htmlFor="latitude_landing" className={styles.labelDirection}>Latitute&nbsp;Landing</label>
                                            <input
                                                className={styles.inputDirection}
                                                value={values.latitude_landing}
                                                onChange={changeHandler}
                                                type="number"
                                                name="latitude_landing"
                                                id="latitude_landing"
                                                placeholder="0.00"
                                            />
                                        </th>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <th className={styles.tableDiffernt}>
                                            <label htmlFor="longitude_takes_off" className={styles.labelDirection}>Longitude&nbsp;Launch</label>
                                            <input
                                                className={styles.inputDirection}
                                                value={values.longitude_takes_off}
                                                onChange={changeHandler}
                                                type="number"
                                                name="longitude_takes_off"
                                                id="longitude_takes_off"
                                                placeholder="0.00"
                                            />
                                        </th>
                                        <th>
                                            <label htmlFor="longitude_landing" className={styles.labelDirection}>Longitude&nbsp;Landing</label>
                                            <input
                                                className={styles.inputDirection}
                                                value={values.longitude_landing}
                                                onChange={changeHandler}
                                                type="number"
                                                name="longitude_landing"
                                                id="longitude_landing"
                                                placeholder="0.00"
                                            />
                                        </th>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <th className={styles.tableDiffernt}>
                                            <label htmlFor="description_launch" className={styles.labelDirection}>Describe&nbsp;Launch</label>

                                            <textarea
                                                className={styles.textareaDirection}
                                                value={values.description_launch}
                                                onChange={changeHandler}
                                                type="text"
                                                id="description_launch"
                                                name="description_launch"
                                                placeholder="Describe the place"
                                            />
                                        </th>
                                        <th>
                                            <label htmlFor="description_landing" className={styles.labelDirection}>Describe&nbsp;Landing</label>

                                            <textarea
                                                className={styles.textareaDirection}
                                                value={values.description_landing}
                                                onChange={changeHandler}
                                                type="text"
                                                id="description_landing"
                                                name="description_landing"
                                                placeholder="Describe the place"
                                            />
                                        </th>
                                    </tr>
                                </tbody>

                            </table>

                            <label className={styles.placeLabel}>Difficulty Level</label>
                            <div className={styles.ratingContainer}>
                                <label htmlFor="ratingA" className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="ratingA"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterA className={styles.ratingLetter} onClick={() => setRating("A")} color={"A" <= (hover || values.difficulty_level) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)} />
                                </label>
                                <label htmlFor="ratingB" className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="ratingB"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterB className={styles.ratingLetter} onClick={() => setRating("B")} color={"B" <= (hover || values.difficulty_level) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("B")} onMouseLeave={() => setHover(null)} />
                                </label>
                                <label htmlFor="ratingC" className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="ratingC"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterC className={styles.ratingLetter} onClick={() => setRating("C")} color={"C" <= (hover || values.difficulty_level) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("C")} onMouseLeave={() => setHover(null)} />
                                </label>
                                <label htmlFor="ratingD" className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="ratingD"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterD className={styles.ratingLetter} onClick={() => setRating("D")} color={"D" <= (hover || values.difficulty_level) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("D")} onMouseLeave={() => setHover(null)} />
                                </label>
                            </div>


                            <label className={styles.placeLabel}>Direction</label>

                            <table className={styles.tableDirection}>
                                <tbody>
                                    <tr>
                                        {Object.entries(checkButtonDirections).map(([mainDirection, indetailDirection]) =>
                                            <th className={styles.tableDirectionDifferent} key={mainDirection}>
                                                {indetailDirection.map(directionDetail => (
                                                <div className={styles.checkboxWrapper} key={directionDetail}>
                                                    <label className={styles.divCheck} htmlFor={directionDetail}>{directionDetail.toUpperCase()}
                                                        <input type="checkbox" name="direction" value={directionDetail} id={directionDetail} onChange={onDirectionsChange} checked={directions[directionDetail] || values.direction[directionDetail]} />
                                                        <span className={styles.checkbox}></span>
                                                    </label>
                                                </div>
                                                ))}
                                            </th>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                            <input className={styles.submit} type="submit" value="Edit" />
                        </div>
                    </div>
                    {/* <input className={styles.submit} type="submit" value="Create" /> */}
                </form>
            </section>
        </div>
    );
}