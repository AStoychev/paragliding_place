import { useState, useEffect, useReducer } from "react"
import { useParams, Link } from "react-router-dom"
import Accordion from 'react-bootstrap/Accordion';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { placeServiceFactory } from "../../services/placeService";

import { commentServiceFactory } from "../../services/commentService";
import { ratingServiceFactory } from "../../services/ratingService";

import { CreateRate } from "./rateComponents/CreateRate";

import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { placeReducer } from "../../reducers/placeReducer";

import { LoginModal } from "../login/LoginModal";

import { MapContainer, TileLayer, Marker, Popup, useMapEvent, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from "leaflet";

import { urlForecast } from "../../utils/urlForecast";
import { isOwner } from "../../validators/validators";

import { usePlaceContext } from "../../contexts/PlaceContext";
import { useCommentContext } from "../../contexts/CommentContext";

import { CommentModal } from "./commentComponents/CreateCommentModal";
import { DeleteCommentModal } from "./commentComponents/DeleteCommentModal";
import { EditCommentModal } from "./commentComponents/EditCommentModal";

import { customIcon, customIconLanding } from "../customIcon/customIcon";
import { ratingCalculate } from "../../utils/ratingCalculate";

import "leaflet/dist/leaflet.css";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styles from "../placeDetails/placeDetails.module.css";

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { userId, isAuthenticated, userName, userEmail } = useAuthContext();

    const [allPlaces, setAllPlaces] = useState([]);
    const [clickHeader, setClickHeader] = useState(`Click On Map To See The Start`)
    const [headerSpiner, setHeaderSpiner] = useState(<Spinner animation="grow" size="sm" />)

    const [place, dispatch] = useReducer(placeReducer, {});

    const { comments, onCreateCommentSubmit, onCommentEditSubmit, removeComment, errors } = useCommentContext()

    const commentService = useService(commentServiceFactory)
    const ratingService = useService(ratingServiceFactory)
    const placeService = useService(placeServiceFactory);
    const allPlaceService = placeServiceFactory();

    useEffect(() => {
        Promise.all([
            placeService.getOne(placeId),
            // commentService.getAll(placeId),
            commentService.getAll(placeId),
            ratingService.getAll(placeId),
        ]).then(([placeData, comments, rate]) => {
            const placeState = {
                ...placeData,
                comments,
                rate,
            };

            dispatch({ type: 'PLACE_FETCH', payload: placeState });
        });
    }, [placeId]);

    useEffect(() => {
        allPlaceService.getAll()
            .then(result => {
                setAllPlaces(result)
            })
    }, [])

    const placeCenterLatitude = parseFloat(place.latitude_takes_off);
    const placeCenterLongitude = parseFloat(place.longitude_takes_off);

    const onCommentSubmit = (values) => {
        onCreateCommentSubmit(values.text, placeId, userId, userName)
    };

    const onCommentEdit = (values) => {
        onCommentEditSubmit(values)
    }

    const onCommentDelete = (values) => {
        removeComment(values)
    }

    const onRateSubmit = async (values) => {
        const response = await ratingService.create(values.rating, userName, userId, placeId);

        dispatch({
            type: 'RATING_ADD',
            payload: response,
            userName,
            userEmail,
        })
    }

    const showAllDirections = () => {
        return Object.keys(place.direction || {}).filter(k => place.direction[k])
    }

    // showAllDirections()

    const haveComments = () => {
        let haveComment = []

        comments && comments.map(x => (
            // place.comments && place.comments.map(x => (
            Number(x.place_comment) === place.id ?
                haveComment.push(x)
                :
                null
        ))
        return haveComment
    }

    const MyComponent = () => {
        const map = useMapEvent('click', () => {
            setClickHeader('')
            setHeaderSpiner('')
            map.setView([placeCenterLatitude, placeCenterLongitude], map.zoom = 16)
        })

        return null
    }

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            // html: `<div class=${styles.clusterIcon}>${cluster.getChildCount() / 2}</div>`,
            className: "custom-marker-cluster",

        });
    }

    // This come from ratingCalculate utils and use it fot ratinf system
    const rateA = ratingCalculate(place, placeId, userId)[0];
    const rateB = ratingCalculate(place, placeId, userId)[1];
    const rateC = ratingCalculate(place, placeId, userId)[2];
    const rateD = ratingCalculate(place, placeId, userId)[3];
    const alreadyRate = ratingCalculate(place, placeId, userId)[4];
    const ownRate = ratingCalculate(place, placeId, userId)[5];

    const navigatePath = `place-details/${placeId}`

    return (
        <div className={styles.container}>
            <div className={styles.twoColumGrid}>
                <div className={styles.leftSide}>
                    <h3 className={styles.headerMap}>{clickHeader}{headerSpiner}</h3>
                    <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[0.000000, 0.000000]} zoom={3} scrollWheelZoom={true} zoomControl={false}>
                        <TileLayer
                            attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MyComponent />
                        <MarkerClusterGroup
                            chunkedLoading
                            iconCreateFunction={createCustomClusterIcon}>
                            {allPlaces.map(marker => (
                                < Marker position={[marker.latitude_takes_off, marker.longitude_takes_off]} icon={customIcon} key={marker.latitude_takes_off}>
                                    <Popup>Launch Place {marker.place}</Popup>
                                </Marker>
                            ))}
                            {allPlaces.map(marker => (
                                <Marker position={[marker.latitude_landing, marker.longitude_landing]} icon={customIconLanding} key={marker.latitude_landing}>
                                    <Popup>Landing Place {marker.place}</Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>

                </div>

                <div className={styles.rightSide}>
                    <div className={styles.topAndBottom}>
                        <div>
                            <div className={styles.itemDirection}>
                                <h1>{place.place}
                                    {isOwner(place.user_id, userId) &&
                                        <Link className={styles.buttonSetting} to={`/place/edit/${place.id}`} title="Setting" ><img src="../images/setting.png" alt="Setting" /></Link>
                                    }
                                </h1>
                            </div>
                        </div>
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

                        <Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>See the ratings of the pilots who visited the place</Accordion.Header>
                                <Accordion.Body >
                                    Rate A: {rateA || 0}% <br></br> <ProgressBar className={styles.voteBar} variant="success" now={rateA} /><br></br>
                                    Rate B: {rateB || 0}% <br></br> <ProgressBar className={styles.voteBar} variant="info" now={rateB} /><br></br>
                                    Rate C: {rateC || 0}% <br></br> <ProgressBar className={styles.voteBar} variant="warning" now={rateC} /><br></br>
                                    Rate D: {rateD || 0}% <br></br> <ProgressBar className={styles.voteBar} variant="danger" now={rateD} /> <br></br>

                                    {isAuthenticated ?
                                        alreadyRate ? <div className={styles.alreadyRateDiv} > You already rate for this place with rate: <span className={styles.alreadyRateSpan}>{ownRate}</span> </div> :
                                            <div>
                                                <p className={styles.placeLabel}>Difficulty Level</p>
                                                <CreateRate onRateSubmit={onRateSubmit} />
                                            </div>
                                        :
                                        <div className={styles.logoutComment}>If you want to vote <span className={styles.spanComment}><LoginModal navigatePath={navigatePath} /></span> </div>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <div>
                            <div className={styles.itemDirection}>
                                <h3>Wing direction for launch: </h3>
                                {showAllDirections().map(k => (
                                    <ul className={styles.directionUnorderList} key={k}>
                                        <li className={styles.directionList}>{k}</li>
                                    </ul>
                                ))}
                                <form action={urlForecast(place.latitude_takes_off, place.longitude_takes_off)} method="get" target="_blank">
                                    <Button variant="info" type="submit">Forecast</Button>
                                </form>
                            </div>
                        </div>

                        <div>
                            <div className={styles.comments}>
                                <div className="details-comments">
                                    <h2>Comments:</h2>
                                    {errors &&
                                        <p className={styles.showErrors} style={{ color: "red" }}>{errors}</p>
                                    }

                                    <div>{haveComments().map(x => (
                                        <div key={x.id}> <Link to={`/profile/${x.user_id}`}>{x.owner}</Link>: {x.text}
                                            {isOwner(x.user_id, userId) &&
                                                <div className={styles.buttonDeleteEditComments}>
                                                    <DeleteCommentModal commentId={x.id} onCommentDelete={onCommentDelete} />
                                                    <EditCommentModal onCommentEdit={onCommentEdit} data={x} />
                                                </div>
                                            }
                                        </div>
                                    ))}</div>

                                    {haveComments().length === 0 &&
                                        <p className="no-comment">No comments yet.</p>
                                    }
                                </div>
                            </div>

                            <div className={styles.logoutComment}>
                                {isAuthenticated ?
                                    <CommentModal onCommentSubmit={onCommentSubmit} />
                                    :
                                    <div className={styles.logoutComment}>If you want to left comment <span className={styles.spanComment}><LoginModal navigatePath={navigatePath} /></span> </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}