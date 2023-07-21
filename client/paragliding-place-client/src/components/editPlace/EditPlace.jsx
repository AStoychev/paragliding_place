import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlaceContext } from '../../contexts/PlaceContext';

import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { placeServiceFactory } from '../../services/placeService';

import { NamePlace } from '../../utils/createEditPlace/namePlace';
import { LatitudeTakesOff } from '../../utils/createEditPlace/latitudeTakesOff';
import { LatitudeLanding } from '../../utils/createEditPlace/latitudeLanding';
import { LongitudeTakesOff } from '../../utils/createEditPlace/longitudeTakesOff';
import { LongituteLandind } from '../../utils/createEditPlace/longitudeLanding';
import { DescribeLaunch } from '../../utils/createEditPlace/describeLaunch';
import { DescribeLanding } from '../../utils/createEditPlace/describeLanding';
import { RatingSystem } from '../../utils/createEditPlace/ratingSystem';
import { Directions } from '../../utils/createEditPlace/directions';

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

                            < NamePlace values={values} changeHandler={changeHandler} />

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
                            <RatingSystem values={values} changeHandler={changeHandler} onRatingChange={onRatingChange} setRating={setRating} />

                            <h3 className={styles.headerDirections}>Direction</h3>
                            < Directions values={values} directions={directions} checkButtonDirections={checkButtonDirections} onDirectionsChange={onDirectionsChange} />

                            <input className={styles.submit} type="submit" value="Edit" />
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}