import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import React, { useState } from 'react';
import { PlaceContext } from '../../contexts/PlaceContext';
import { usePlaceContext } from '../../contexts/PlaceContext';
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { requestFactory } from "../../services/requester";

import { DifficultyRating } from '../difficultyRating/DifficultyRating';

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
    const [showDirection, setShowDirection] = useState("")

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    const [value, setValue] = useState([1, 3]);
    const handleChange = (val) => setValue(val);


    // Delete not functional only for test show info about places in db
    // You can use this for rendering information on the map when is all already
    const info = async () => {
        const request = requestFactory("0902496d6576b1b29b015d90b1996f9a9cab6d69")
        const baseUrl = `http://localhost:8000/api/place`;
        const result = await request.get(baseUrl);
        return result
    };
    // Delete not functional only for test show info about places in db

    const isRequired = []
    const items = (Object.values(values));

    const isFull = () => {
        if (isRequired.length === items.length - 1) {
            return true
        } else {
            return false
        }
    }

    for (let i = 0; i < items.length; i++) {
        if ((items[i].length) > 0) {
            isRequired.push(1)
        }
    }

    //

    const onRatingChange = (e) => {
        values.difficulty_level = rating
    }

    const onDirectionsChange = (e) => {
        values.direction[e.target.value] = e.target.checked


        setDirections(state => ({ ...state, [e.target.value]: e.target.checked }));

        let len = Object.keys(values.direction).length
    }


    const showAllDirection = () => {
        let allDirections = []
        for (let i = 0; i < Object.keys(values.direction).length; i++) {
            let allDirectionsItem = Object.keys(values.direction)[i]
            allDirections.push(allDirectionsItem)
        }

        return (
            allDirections.map(x => (
                <div key={x}>
                    <label htmlFor={x} key={Object.keys(values.direction).length}>{x}</label>
                    {/* <label for={x} key={Object.keys(values.direction).length}>{x}</label> */}
                    <input type="checkbox" name="direction" value={x} id={x} onChange={onDirectionsChange} checked={directions[{ x }] || false} key={Object.keys(values.direction)} style={{ margin: '10px' }}></input>
                </div>
            ))
        )
    }

    return (
        <div className={styles.container}>
            <section id={styles.createPlace} className="content auth">
                <form method='POST' onSubmit={onSubmit}>
                    <div className={styles.threeColumnsGrid}>
                        <div className={styles.leftSide}>1</div>
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

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='e'>E
                                                    <input type="checkbox" name="direction" value="e" id='e' onChange={onDirectionsChange} checked={directions['e'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='es'>ES
                                                    <input type="checkbox" name="direction" value="es" id='es' onChange={onDirectionsChange} checked={directions['es'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ees'>EES
                                                    <input type="checkbox" name="direction" value="ees" id='ees' onChange={onDirectionsChange} checked={directions['ees'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='en'>EN
                                                    <input type="checkbox" name="direction" value="en" id='en' onChange={onDirectionsChange} checked={directions['en'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='een'>EEN
                                                    <input type="checkbox" name="direction" value="een" id='een' onChange={onDirectionsChange} checked={directions['een'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ene'>ENE
                                                    <input type="checkbox" name="direction" value="ene" id='ene' onChange={onDirectionsChange} checked={directions['ene'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ese'>ESE
                                                    <input type="checkbox" name="direction" value="ese" id='ese' onChange={onDirectionsChange} checked={directions['ese'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                        </th>

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='w'>W
                                                    <input type="checkbox" name="direction" value="w" id='w' onChange={onDirectionsChange} checked={directions['w'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ws'>WS
                                                    <input type="checkbox" name="direction" value="ws" id='ws' onChange={onDirectionsChange} checked={directions['ws'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wws'>WWS
                                                    <input type="checkbox" name="direction" value="wws" id='wws' onChange={onDirectionsChange} checked={directions['wws'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wn'>WN
                                                    <input type="checkbox" name="direction" value="wn" id='wn' onChange={onDirectionsChange} checked={directions['wn'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wwn'>WWN
                                                    <input type="checkbox" name="direction" value="wwn" id='wwn' onChange={onDirectionsChange} checked={directions['wwn'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wnw'>WNW
                                                    <input type="checkbox" name="direction" value="wnw" id='wnw' onChange={onDirectionsChange} checked={directions['wnw'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='wsw'>WSW
                                                    <input type="checkbox" name="direction" value="wsw" id='wsw' onChange={onDirectionsChange} checked={directions['wsw'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>
                                        </th>

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='n'>N
                                                    <input type="checkbox" name="direction" value="n" id='n' onChange={onDirectionsChange} checked={directions['n'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nw'>NW
                                                    <input type="checkbox" name="direction" value="nw" id='nw' onChange={onDirectionsChange} checked={directions['nw'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nnw'>NNW
                                                    <input type="checkbox" name="direction" value="nnw" id='nnw' onChange={onDirectionsChange} checked={directions['nnw'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ne'>NE
                                                    <input type="checkbox" name="direction" value="ne" id='ne' onChange={onDirectionsChange} checked={directions['ne'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nne'>NNE
                                                    <input type="checkbox" name="direction" value="nne" id='nne' onChange={onDirectionsChange} checked={directions['nne'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nwn'>NWN
                                                    <input type="checkbox" name="direction" value="nwn" id='nwn' onChange={onDirectionsChange} checked={directions['nwn'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='nen'>NEN
                                                    <input type="checkbox" name="direction" value="nen" id='nen' onChange={onDirectionsChange} checked={directions['nen'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>
                                        </th>

                                        <th className={styles.tableDirectionDifferent}>
                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='s'>S
                                                    <input type="checkbox" name="direction" value="s" id='s' onChange={onDirectionsChange} checked={directions['s'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='sw'>SW
                                                    <input type="checkbox" name="direction" value="sw" id='sw' onChange={onDirectionsChange} checked={directions['sw'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ssw'>SSW
                                                    <input type="checkbox" name="direction" value="ssw" id='ssw' onChange={onDirectionsChange} checked={directions['ssw'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='se'>SE
                                                    <input type="checkbox" name="direction" value="se" id='se' onChange={onDirectionsChange} checked={directions['se'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='sse'>SSE
                                                    <input type="checkbox" name="direction" value="sse" id='sse' onChange={onDirectionsChange} checked={directions['sse'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='sws'>SWS
                                                    <input type="checkbox" name="direction" value="sws" id='sws' onChange={onDirectionsChange} checked={directions['sws'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>

                                            <div className={styles.checkboxWrapper}>
                                                <label className={styles.divCheck} htmlFor='ses'>SES
                                                    <input type="checkbox" name="direction" value="ses" id='ses' onChange={onDirectionsChange} checked={directions['ses'] || false} />
                                                    <span className={styles.checkbox}></span>
                                                </label>
                                            </div>
                                        </th>
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


{/* <table>
    <tr>
        <th>Column1</th>
        <th>Column2</th>
        <th>Column3</th>
    </tr>
</table> */}