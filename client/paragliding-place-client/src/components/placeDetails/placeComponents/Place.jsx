import { Link } from "react-router-dom"
import { urlForecast } from "../../../utils/urlForecast";
import { isOwnerOrStaff } from "../../../validators/validators";

import { dictionaryDirections } from "../../../constants/constants";

import Button from 'react-bootstrap/Button';
import styles from "../../placeDetails/placeDetails.module.css";

export const Place = ({
    place,
    userId,
}) => {

    const showAllDirections = () => {
        return Object.keys(place.direction || {}).filter(k => place.direction[k])
    }

    const fullDirectionName = (x) => {
        // let firstLetter = (x ? x.charAt(0) : "")
        const fullDirectionNamePlace = []
        fullDirectionNamePlace.push(dictionaryDirections[x])
        return fullDirectionNamePlace
    }

    return (

        <div className={styles.placeContainer}>

            <div className={styles.containerItem}>

                <div className={styles.item}>
                    <h3>Launch Coordinates</h3>
                    <p>Latitude: {place.latitude_takes_off}</p>
                    <p>Longitute:{place.longitude_takes_off}</p>
                    <h3>Description</h3>
                    <p>{place.description_launch}</p>
                </div>

                <div className={styles.item}>
                    <h3>Landing Coordinates</h3>
                    <p>Latitude: {place.latitude_landing}</p>
                    <p>Longitute:{place.longitude_landing}</p>
                    <h3>Description</h3>
                    <p>{place.description_landing}</p>
                </div>
            </div>

            <div className={styles.itemDirection}>
                <h3>The creator of the place appreciates with difficulty: <span className={styles.difficultyLevelDetails}>{place.difficulty_level}</span></h3>
            </div>

            <div>
                <div className={styles.itemDirection}>
                    <h3>Wing direction for launch: </h3>
                    {showAllDirections().map(k => (
                        <ul className={styles.directionUnorderList} key={k}>
                            <li className={styles.directionList}>{fullDirectionName(k)}</li>
                        </ul>
                    ))}
                    <form action={urlForecast(place.latitude_takes_off, place.longitude_takes_off)} method="get" target="_blank">
                        <Button variant="info" type="submit">Forecast</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}