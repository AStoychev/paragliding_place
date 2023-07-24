import { CreateRate } from "./../rateComponents/CreateRate";

import { LoginModal } from "../../login/LoginModal";
import { ratingCalculate } from "../../../utils/ratingCalculate";

import { ratingServiceFactory } from "../../../services/ratingService";
import { useService } from "../../../hooks/useService";

import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from "../rateComponents/RateComponent.modules.css";

export const RateSystem = ({
    userName,
    userId,
    placeId,
    isAuthenticated,
    dispatch,
    place,
}) => {

    const ratingService = useService(ratingServiceFactory)

    const onRateSubmit = async (values) => {
        const response = await ratingService.create(values.rating, userName, userId, placeId);

        dispatch({
            type: 'RATING_ADD',
            payload: response,
            userName,
        })
    }

    // This come from ratingCalculate utils and use it fot ratinf system
    const rateA = ratingCalculate(place, placeId, userId)[0];
    const rateB = ratingCalculate(place, placeId, userId)[1];
    const rateC = ratingCalculate(place, placeId, userId)[2];
    const rateD = ratingCalculate(place, placeId, userId)[3];
    const alreadyRate = ratingCalculate(place, placeId, userId)[4];
    const ownRate = ratingCalculate(place, placeId, userId)[5];

    const navigatePath = `place-details/${placeId}/rating`

    return (
        <div className="ratingContainer">
            <div className="ratingPlace">
                Rate A: {rateA || 0}% <br></br> <ProgressBar className="voteBar" variant="success" now={rateA} /><br></br>
                Rate B: {rateB || 0}% <br></br> <ProgressBar className="voteBar" variant="info" now={rateB} /><br></br>
                Rate C: {rateC || 0}% <br></br> <ProgressBar className="voteBar" variant="warning" now={rateC} /><br></br>
                Rate D: {rateD || 0}% <br></br> <ProgressBar className="voteBar" variant="danger" now={rateD} /> <br></br>
            </div>
            
            {isAuthenticated ?
                    alreadyRate ? <div className="alreadyRateDiv" > You already rate for this place with rate: <span className={styles.alreadyRateSpan}>{ownRate}</span> </div> :
                        <div className="ratingSystemPosition">
                            {/* <p className="placeLabel">Difficulty Level</p> */}
                            <CreateRate onRateSubmit={onRateSubmit} />
                        </div>
                    :
                    <div className="logoutComment">If you want to vote <span className="spanComment"><LoginModal navigatePath={navigatePath} /></span> </div>
                }
        </div>
    )
}