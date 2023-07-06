import { useState, useEffect, useReducer } from "react"
import { useParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { IconContext } from "react-icons";
import { TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD } from "react-icons/tb";
import { CgLoadbar } from "react-icons/cg"

import { useForm } from "../../hooks/useForm";

import { placeServiceFactory } from "../../services/placeService";
// import * as commentService from "../../services/commentService"

import { commentServiceFactory } from "../../services/commentService";
import { ratingServiceFactory } from "../../services/ratingService";

import { CreateRace } from "./rateComponents/CreateRate";

import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { placeReducer } from "../../reducers/placeReducer";

import { LoginModal } from "../login/LoginModal";

import { MapContainer, TileLayer, Marker, Popup, useMapEvent, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, marker } from "leaflet";

import { usePlaceContext } from "../../contexts/PlaceContext";
import { useCommentContext } from "../../contexts/CommentContext";

import { CommentModal } from "./commentComponents/CreateCommentModal";
import { DeleteCommentModal } from "./commentComponents/DeleteCommentModal";
import { EditCommentModal } from "./commentComponents/EditCommentModal";

import styles from "../placeDetails/placeDetails.module.css";
// import { map } from "leaflet";

import "leaflet/dist/leaflet.css";
// import L from "leaflet";

import Button from 'react-bootstrap/Button';


import Spinner from 'react-bootstrap/Spinner';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { userId, isAuthenticated, userName, userEmail } = useAuthContext();

    const [allPlaces, setAllPlaces] = useState([]);
    const [allRating, setAllRating] = useState([]);
    const [clickHeader, setClickHeader] = useState(`Click On Map To See The Start`)
    const [headerSpiner, setHeaderSpiner] = useState(<Spinner animation="grow" size="sm" />)

    const [place, dispatch] = useReducer(placeReducer, {});

    // const { removeComment } = useCommentContext()

    const commentService = useService(commentServiceFactory)
    const ratingService = useService(ratingServiceFactory)
    const placeService = useService(placeServiceFactory);
    const allPlaceService = placeServiceFactory();
    const navigate = useNavigate();

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


    useEffect(() => {
        ratingService.getAll()
            .then(result => {
                setAllRating(result)
            })
    }, [])

    const placeCenterLatitude = parseFloat(place.latitude_takes_off);
    const placeCenterLongitude = parseFloat(place.longitude_takes_off);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(values.text, placeId, userId, userName);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userName,
            userEmail,
        })
    };

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

    showAllDirections()

    const haveComments = () => {
        let haveComment = []
        {
            place.comments && place.comments.map(x => (
                x.place_comment == place.id ?
                    haveComment.push(x)
                    :
                    null
            ))
        }
        return haveComment
    }

    const isOwner = (placeOwner, ownerId) => {
        if (placeOwner === ownerId) {
            return true
        }
    }

    const urlLink = (e, n) => {
        let url = `https://www.meteoblue.com/en/weather/week/${e}N${n}E`

        return url
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

    const customIcon = new Icon({
        iconUrl: require('../../img/paragliding.png'),
        iconSize: [49, 49]
    })

    const customIconLanding = new Icon({
        iconUrl: require('../../img/target.png'),
        iconSize: [49, 49]
    })

    const ratingPlace = () => {
        let alreadyRate = false
        let rate = "";
        let rateA = 0;
        let rateB = 0;
        let rateC = 0;
        let rateD = 0;

        const inPercentage = (rate, allPeople) => {
            let result = (rate / allPeople) * 100
            return Math.round(result)
        }

        place.rate && place.rate.map(x => {
            if (x.user_id === userId) {
                rate = x.rating
                alreadyRate = true
            }

            if (x.place_id_rating == placeId) {
                // rate.push(x.rating)
                if (x.rating === "A") {
                    rateA += 1
                } else if (x.rating == "B") {
                    rateB += 1
                } else if (x.rating == "C") {
                    rateC += 1
                } else if (x.rating == "D") {
                    rateD += 1
                }
            }
        })

        let allPeopleRate = rateA + rateB + rateC + rateD
        // let digits = [rateA, rateB, rateC, rateD]
        // let maxDigit = digits.indexOf(Math.max(...digits))
        // let maxRate = digits[maxDigit]

        rateA = inPercentage(rateA, allPeopleRate);
        rateB = inPercentage(rateB, allPeopleRate);
        rateC = inPercentage(rateC, allPeopleRate);
        rateD = inPercentage(rateD, allPeopleRate);

        return [rateA, rateB, rateC, rateD, allPeopleRate, rate]
    }

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
                                    Rate A: {ratingPlace()[0]} <br></br> <div className={styles.barRatingA} style={{ width: `${5 * ratingPlace()[0]}px` }}></div> <br></br>
                                    Rate B: {ratingPlace()[1]} <br></br> <div className={styles.barRatingB} style={{ width: `${5 * ratingPlace()[1]}px` }}></div> <br></br>
                                    Rate C: {ratingPlace()[2]} <br></br> <div className={styles.barRatingC} style={{ width: `${5 * ratingPlace()[2]}px` }}></div> <br></br>
                                    Rate D: {ratingPlace()[3]} <br></br> <div className={styles.barRatingD} style={{ width: `${5 * ratingPlace()[2]}px` }}></div> <br></br>

                                    {ratingPlace()[4] ? <div className={styles.alreadyRateDiv}>You already rate for this place with rate: <span className={styles.alreadyRateSpan}>{ratingPlace()[5]}</span> </div> :
                                        <div>
                                            <label className={styles.placeLabel}>Difficulty Level</label>
                                            <CreateRace onRateSubmit={onRateSubmit} />
                                        </div>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* <Accordion.Item eventKey="1">
                                <Accordion.Header>If you have flown to the place, place rate its difficulty</Accordion.Header>
                                <Accordion.Body>
                                    {ratingPlace()[4] ? <div>You already rate for this place with rate: </div> :
                                        <div>
                                            <label className={styles.placeLabel}>Difficulty Level</label>
                                            <CreateRace onRateSubmit={onRateSubmit} />
                                        </div>
                                    } */}
                                    {/* <label className={styles.placeLabel}>Difficulty Level</label>
                                    <CreateRace onRateSubmit={onRateSubmit}/> */}
                                {/* </Accordion.Body>
                            </Accordion.Item> */}
                        </Accordion>

                        <div>
                            <div className={styles.itemDirection}>
                                <h3>Wing direction for launch: </h3>
                                {showAllDirections().map(k => (
                                    <ul className={styles.directionUnorderList} key={k}>
                                        <li className={styles.directionList}>{k}</li>
                                    </ul>
                                ))}
                                <form action={urlLink(place.latitude_takes_off, place.longitude_takes_off)} method="get" target="_blank">
                                    <Button variant="info" type="submit">Forecast</Button>
                                </form>
                            </div>
                        </div>

                        <div>

                            <div className={styles.comments}>
                                <div className="details-comments">
                                    <h2>Comments:
                                    </h2>
                                    <div>{haveComments().map(x => (
                                        <div key={x.id}> {x.owner}: {x.text}
                                            {isOwner(x.user_id, userId) &&
                                                <div className={styles.buttonDeleteEditComments}>
                                                    <DeleteCommentModal deleteComment={x.id} />
                                                    <EditCommentModal editComment={x.text} editCommentId={x.id} commentPlaceId={placeId} />
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
                                {isAuthenticated &&
                                    <CommentModal onCommentSubmit={onCommentSubmit} />
                                }
                                {!isAuthenticated &&
                                    <div className={styles.logoutComment}>If you want to left comment <span className={styles.spanComment}><LoginModal /></span> </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}