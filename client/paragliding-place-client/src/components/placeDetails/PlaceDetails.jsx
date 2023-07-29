import { useState, useEffect, useReducer } from "react"
import { useParams, useNavigate, Link, NavLink, Routes, Route } from "react-router-dom"

import { placeServiceFactory } from "../../services/placeService";

import { commentServiceFactory } from "../../services/commentService";
import { ratingServiceFactory } from "../../services/ratingService";

import { DetailsMapContainer } from "./detailsMapContainer/DetailsMapContainer";
import { Place } from "./placeComponents/Place";
import { RateSystem } from "./rateComponents/Rate";
import { Comments } from "./commentComponents/Comments";

import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { placeReducer } from "../../reducers/placeReducer";

import { isOwner } from "../../validators/validators";

import { PageNotFound } from "../pageNotFound/pageNotFound";

import "leaflet/dist/leaflet.css";
import styles from "../placeDetails/placeDetails.module.css";

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { userId, isAuthenticated, userName } = useAuthContext();

    const [allPlaces, setAllPlaces] = useState([]);

    const [place, dispatch] = useReducer(placeReducer, {});

    const commentService = useService(commentServiceFactory)
    const ratingService = useService(ratingServiceFactory)
    const placeService = useService(placeServiceFactory);
    const allPlaceService = placeServiceFactory();

    const navigate = useNavigate()

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
            
            // Redirect to page not found
            if(placeData === "error") {
                navigate("/pageNotFound")
            }

            dispatch({ type: 'PLACE_FETCH', payload: placeState });
        });
    }, [placeId]);

    useEffect(() => {
        allPlaceService.getAll()
            .then(result => {
                setAllPlaces(result)
            })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.twoColumGrid}>
                {/* Right Side */}
                <DetailsMapContainer place={place} allPlaces={allPlaces} />

                <div className={styles.rightSideDetails}>
                    <div className={styles.topAndBottom}>
                        <div className={styles.itemDirection}>
                            <h1>{place.place}
                                {isOwner(place.user_id, userId) &&
                                    <Link className={styles.buttonSetting} to={`/place/edit/${place.id}`} title="Setting" ><img src="../../images/setting.png" alt="Setting" /></Link>
                                }
                            </h1>
                        </div>

                        <nav className={styles.detailsNavigation}>
                            <li className={styles.LiNavigation}><NavLink style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })} className={styles.LinkNavigation} to="detail">DETAILS</NavLink></li>
                            <li className={styles.LiNavigation}><NavLink style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })} className={styles.LinkNavigation} to="rating">RATING</NavLink></li>
                            <li className={styles.LiNavigation}><NavLink style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })} className={styles.LinkNavigation} to="comments">COMMENTS</NavLink></li>
                        </nav>

                        <Routes>
                            <Route path="/detail" element={< Place place={place} userId={userId} />} />
                            <Route path="/rating" element={< RateSystem userName={userName}
                                userId={userId} placeId={placeId}
                                isAuthenticated={isAuthenticated} dispatch={dispatch}
                                place={place} />} />
                            <Route path="/comments" element={<Comments place={place} placeId={placeId}
                                userId={userId} userName={userName}
                                isAuthenticated={isAuthenticated} />} />
                        </Routes>

                    </div>
                </div>
            </div>
        </div >
    )
}