import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlaceContext } from '../../contexts/PlaceContext';
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { placeServiceFactory } from '../../services/placeService';

import { DeletePlace } from '../deletePlace/DeletePlace'

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

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='e'>E
                                                    <input type="checkbox" name="direction" value="e" id='e' onChange={onDirectionsChange} checked={directions['e'] || values.direction['e']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='es'>ES
                                                    <input type="checkbox" name="direction" value="es" id='es' onChange={onDirectionsChange} checked={directions['es'] || values.direction['es']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ees'>EES
                                                    <input type="checkbox" name="direction" value="ees" id='ees' onChange={onDirectionsChange} checked={directions['ees'] || values.direction['ees']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='en'>EN
                                                    <input type="checkbox" name="direction" value="en" id='en' onChange={onDirectionsChange} checked={directions['en'] || values.direction['en']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='een'>EEN
                                                    <input type="checkbox" name="direction" value="een" id='een' onChange={onDirectionsChange} checked={directions['een'] || values.direction['een']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ene'>ENE
                                                    <input type="checkbox" name="direction" value="ene" id='ene' onChange={onDirectionsChange} checked={directions['ene'] || values.direction['ene']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ese'>ESE
                                                    <input type="checkbox" name="direction" value="ese" id='ese' onChange={onDirectionsChange} checked={directions['ese'] || values.direction['ese']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                        </th>

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='w'>W
                                                    <input type="checkbox" name="direction" value="w" id='w' onChange={onDirectionsChange} checked={directions['w'] || values.direction['w']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ws'>WS
                                                    <input type="checkbox" name="direction" value="ws" id='ws' onChange={onDirectionsChange} checked={directions['ws'] || values.direction['ws']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wws'>WWS
                                                    <input type="checkbox" name="direction" value="wws" id='wws' onChange={onDirectionsChange} checked={directions['wws'] || values.direction['wws']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wn'>WN
                                                    <input type="checkbox" name="direction" value="wn" id='wn' onChange={onDirectionsChange} checked={directions['wn'] || values.direction['wn']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wwn'>WWN
                                                    <input type="checkbox" name="direction" value="wwn" id='wwn' onChange={onDirectionsChange} checked={directions['wwn'] || values.direction['wwn']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wnw'>WNW
                                                    <input type="checkbox" name="direction" value="wnw" id='wnw' onChange={onDirectionsChange} checked={directions['wnw'] || values.direction['wnw']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wsw'>WSW
                                                    <input type="checkbox" name="direction" value="wsw" id='wsw' onChange={onDirectionsChange} checked={directions['wsw'] || values.direction['wsw']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>
                                        </th>

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='n'>N
                                                    <input type="checkbox" name="direction" value="n" id='n' onChange={onDirectionsChange} checked={directions['n'] || values.direction['n']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nw'>NW
                                                    <input type="checkbox" name="direction" value="nw" id='nw' onChange={onDirectionsChange} checked={directions['nw'] || values.direction['nw']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nnw'>NNW
                                                    <input type="checkbox" name="direction" value="nnw" id='nnw' onChange={onDirectionsChange} checked={directions['nnw'] || values.direction['nnw']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ne'>NE
                                                    <input type="checkbox" name="direction" value="ne" id='ne' onChange={onDirectionsChange} checked={directions['ne'] || values.direction['ne']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nne'>NNE
                                                    <input type="checkbox" name="direction" value="nne" id='nne' onChange={onDirectionsChange} checked={directions['nne'] || values.direction['nne']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nwn'>NWN
                                                    <input type="checkbox" name="direction" value="nwn" id='nwn' onChange={onDirectionsChange} checked={directions['nwn'] || values.direction['nwn']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nen'>NEN
                                                    <input type="checkbox" name="direction" value="nen" id='nen' onChange={onDirectionsChange} checked={directions['nen'] || values.direction['nen']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>
                                        </th>

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='s'>S
                                                    <input type="checkbox" name="direction" value="s" id='s' onChange={onDirectionsChange} checked={directions['s'] || values.direction['s']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='sw'>SW
                                                    <input type="checkbox" name="direction" value="sw" id='sw' onChange={onDirectionsChange} checked={directions['sw'] || values.direction['sw']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ssw'>SSW
                                                    <input type="checkbox" name="direction" value="ssw" id='ssw' onChange={onDirectionsChange} checked={directions['ssw'] || values.direction['ssw']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='se'>SE
                                                    <input type="checkbox" name="direction" value="se" id='se' onChange={onDirectionsChange} checked={directions['se'] || values.direction['se']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='sse'>SSE
                                                    <input type="checkbox" name="direction" value="sse" id='sse' onChange={onDirectionsChange} checked={directions['sse'] || values.direction['sse']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='sws'>SWS
                                                    <input type="checkbox" name="direction" value="sws" id='sws' onChange={onDirectionsChange} checked={directions['sws'] || values.direction['sws']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ses'>SES
                                                    <input type="checkbox" name="direction" value="ses" id='ses' onChange={onDirectionsChange} checked={directions['ses'] || values.direction['ses']} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>
                                        </th>
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