import { useForm } from '../../hooks/useForm';

import React, { useContext, useState } from 'react';
import { usePlaceContext } from '../../contexts/PlaceContext';
import { requestFactory } from "../../services/requester";

import { NamePlace } from "../../utils/createEditPlace/namePlace";
import { LatitudeTakesOff } from '../../utils/createEditPlace/latitudeTakesOff';
import { LatitudeLanding } from '../../utils/createEditPlace/latitudeLanding';
import { LongitudeTakesOff } from '../../utils/createEditPlace/longitudeTakesOff';
import { LongituteLandind } from '../../utils/createEditPlace/longitudeLanding';
import { DescribeLaunch } from '../../utils/createEditPlace/describeLaunch';
import { DescribeLanding } from '../../utils/createEditPlace/describeLanding';
import { RatingSystemCreate } from '../../utils/createEditPlace/ratingSystem';
import { Directions } from '../../utils/createEditPlace/directions';

import { checkButtonDirections } from '../../constants/constants';

import styles from './CreateEditNewPlace.module.css';

export const CreateNewPlace = () => {

    const { onCreatePlaceSubmit, errors } = usePlaceContext()
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
                <form method='POST' onSubmit={onSubmit} name="createPlace">
                    <div className={styles.threeColumnsGrid}>
                        <div className={styles.leftSide}></div>
                        <div className={styles.rightSide}>
                            <h3 className={styles.header}>Create Place</h3>

                            <NamePlace values={values} changeHandler={changeHandler} />

                            <table className={styles.tablePosition} >
                                <tbody>
                                    <tr>
                                        <LatitudeTakesOff values={values} changeHandler={changeHandler} />
                                        <LatitudeLanding values={values} changeHandler={changeHandler} />
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <LongitudeTakesOff values={values} changeHandler={changeHandler} />
                                        <LongituteLandind values={values} changeHandler={changeHandler} />
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <DescribeLaunch values={values} changeHandler={changeHandler} />
                                        <DescribeLanding values={values} changeHandler={changeHandler} />
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className={styles.headerDifficultyLevel}>Difficulty Level</h3>
                            <RatingSystemCreate values={values} changeHandler={changeHandler} onRatingChange={onRatingChange} setRating={setRating} />

                            <h3 className={styles.headerDirections}>Direction</h3>
                            < Directions values={values} directions={directions} checkButtonDirections={checkButtonDirections} onDirectionsChange={onDirectionsChange} />

                            {errors &&
                                <p className={styles.showErrors}>{errors}</p>
                            }

                            <input className={styles.submit} type="submit" value="Create" />
                        </div>
                    </div>
                </form>
            </section>
        </div >
    );
}