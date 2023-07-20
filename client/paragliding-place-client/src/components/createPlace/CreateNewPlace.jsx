import { useForm } from '../../hooks/useForm';

import React, { useState } from 'react';
import { usePlaceContext } from '../../contexts/PlaceContext';
import { requestFactory } from "../../services/requester";

import { checkButtonDirections } from '../../constants/constants';

import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";
import styles from './CreateEditNewPlace.module.css';

export const CreateNewPlace = () => {

    const { onCreatePlaceSubmit } = usePlaceContext()
    const { values, changeHandler, onSubmit } = useForm({
        id: '',
        place: '',
        latitude_takes_off: '',
        longitude_takes_off: '',
        latitude_landing: '',
        longitude_landing: '',
        description: '',
        difficulty_level: '',
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
    }, onCreatePlaceSubmit);

    const [directions, setDirections] = useState({});

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    // Delete not functional only for test show info about places in db
    // You can use this for rendering information on the map when is all already
    const info = async () => {
        const request = requestFactory("0902496d6576b1b29b015d90b1996f9a9cab6d69")
        const baseUrl = `http://localhost:8000/api/place`;
        const result = await request.get(baseUrl);
        return result
    };
    // Delete not functional only for test show info about places in db

    const onRatingChange = () => {
        values.difficulty_level = rating
    }

    const onDirectionsChange = (e) => {
        values.direction[e.target.value] = e.target.checked
        setDirections(state => ({ ...state, [e.target.value]: e.target.checked }));
    }

    return (
        <div className={styles.container}>
            <section id={styles.createPlace} className="content auth">
                <form method='POST' onSubmit={onSubmit}>
                    <div className={styles.threeColumnsGrid}>
                        <div className={styles.leftSide}></div>
                        <div className={styles.rightSide}>
                            <h3 className={styles.header}>Create Place</h3>

                            <label className={styles.placeLabel} htmlFor="place">Place Name</label>
                            <input value={values.place} className={styles.inputName} onChange={changeHandler} id="place" type="text" name="place" placeholder="Write name" />

                            <table className={styles.tablePosition} >

                                <tbody>
                                    <tr>
                                        <th className={styles.tableDiffernt}>
                                            <label htmlFor="latitude_takes_off" className={styles.labelDirection}>Latitute&nbsp;Launch</label>
                                            <input value={values.latitude_takes_off} className={styles.inputDirection} onChange={changeHandler} id="latitude_takes_off" type="number" name="latitude_takes_off" placeholder="0.00" />
                                        </th>
                                        <th>
                                            <label htmlFor="latitude_landing" className={styles.labelDirection}>Latitute&nbsp;Landing</label>
                                            <input value={values.latitude_landing} className={styles.inputDirection} onChange={changeHandler} id="latitude_landing" type="number" name="latitude_landing" placeholder="0.00" />
                                        </th>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <th className={styles.tableDiffernt}>
                                            <label htmlFor="longitude_takes_off" className={styles.labelDirection}>Longitude&nbsp;Launch</label>
                                            <input value={values.longitude_takes_off} className={styles.inputDirection} onChange={changeHandler} id="longitude_takes_off" type="number" name="longitude_takes_off" placeholder="0.00" />
                                        </th>
                                        <th>
                                            <label htmlFor="longitude_landing" className={styles.labelDirection}>Longitude&nbsp;Landing</label>
                                            <input value={values.longitude_landing} className={styles.inputDirection} onChange={changeHandler} id="longitude_landing" type="number" name="longitude_landing" placeholder="0.00" />
                                        </th>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <th className={styles.tableDiffernt}>
                                            <label htmlFor="description_launch" className={styles.labelDirection}>Describe&nbsp;Launch</label>

                                            <textarea value={values.description_launch} className={styles.textareaDirection} onChange={changeHandler} type="text" id="description_launch" name="description_launch" placeholder="Describe the place"></textarea>
                                        </th>
                                        <th>
                                            <label htmlFor="description_landing" className={styles.labelDirection}>Describe&nbsp;Landing</label>

                                            <textarea value={values.description_landing} className={styles.textareaDirection} onChange={changeHandler} type="text" id="description_landing" name="description_landing" placeholder="Describe the place"></textarea>
                                        </th>
                                    </tr>
                                </tbody>

                            </table>

                            <label className={styles.placeLabel}>Difficulty Level</label>
                            <div className={styles.ratingContainer}>
                                <label className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterA className={styles.ratingLetter} onClick={() => setRating("A")} color={"A" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("A")} onMouseLeave={() => setHover(null)} />
                                </label>
                                <label className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterB className={styles.ratingLetter} onClick={() => setRating("B")} color={"B" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("B")} onMouseLeave={() => setHover(null)} />
                                </label>
                                <label className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterC className={styles.ratingLetter} onClick={() => setRating("C")} color={"C" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("C")} onMouseLeave={() => setHover(null)} />
                                </label>
                                <label className={styles.labelRating} onChange={changeHandler} >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={values.difficulty_level}
                                        onChange={onRatingChange}
                                    />
                                    <TbCircleLetterD className={styles.ratingLetter} onClick={() => setRating("D")} color={"D" <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover("D")} onMouseLeave={() => setHover(null)} />
                                </label>
                                {/* <p className={styles.ratingParagraph}>You choose: <span className={styles.chooseRating}>{rating}</span></p> */}
                            </div>




                            <label className={styles.placeLabel}>Direction</label>

                            <table className={styles.tableDirection}>
                                <tbody>
                                    <tr>
                                        {Object.entries(checkButtonDirections).map(([mainDirection, indetailDirection]) =>
                                            <th className={styles.tableDirectionDifferent} key={mainDirection}>
                                                {indetailDirection.map(directionDetail => (
                                                    <div
                                                        className={styles.checkboxWrapper}
                                                        key={directionDetail}>
                                                        <label
                                                            className={styles.divCheck}
                                                            htmlFor={directionDetail}>
                                                            {directionDetail.toUpperCase()}
                                                            <input
                                                                type="checkbox"
                                                                name="direction"
                                                                value={directionDetail}
                                                                id={directionDetail}
                                                                onChange={onDirectionsChange}
                                                                checked={directions[directionDetail] || false}
                                                            />
                                                            <span
                                                                className={styles.checkbox}>
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </th>
                                        )}
                                    </tr>

                                </tbody>
                            </table>
                            <input className={styles.submit} type="submit" value="Create" />
                        </div>
                    </div>
                    {/* <input className={styles.submit} type="submit" value="Create" /> */}
                </form>
            </section>
        </div>
    );
}