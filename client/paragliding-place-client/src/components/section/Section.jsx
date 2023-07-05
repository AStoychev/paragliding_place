import { useContext, useState, useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import "./style.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from '../../contexts/AuthContext';

// import { ModalForecast } from "./modalForecast/ModalForecast";

import { placeServiceFactory } from "../../services/placeService";
// import { commentServiceFactory } from "../../services/commentService";
// import { useCommentContext } from "../../contexts/CommentContext";

// import { create } from "../../services/commentService";
import React from "react";
import { placeReducer } from "../../reducers/placeReducer";

import { useGeolocated } from "react-geolocated";

// This is for find my location
import L from "leaflet";
import icon from "../findMyLocation/constants"
// This is for find my location

export const Section = () => {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 10000,
        });

    const DEFAULT_LATITUDE = 42.149278;
    const DEFAULT_LONGITUDE = 24.747013;

    // To work this correctly you have to fix the geolocate functionality 
    const latitudes = coords ? coords.latitude : DEFAULT_LATITUDE;
    const longitudes = coords ? coords.longitude : DEFAULT_LONGITUDE;

    // const tryCoords = (lat, long) => {
    //     const centerCordinates = []
    //     if (isGeolocationEnabled) {
    //         centerCordinates.push(lat, long)
    //     } else {
    //         centerCordinates.push(DEFAULT_LATITUDE, DEFAULT_LONGITUDE)
    //     }
    //     return centerCordinates
    // }

    // const latitude = coords.map(x => (
    //     x.latitude ? x.latitude : DEFAULT_LATITUDE
    // ));
    // const longitude = coords.map(x => (
    //     x.longitude ? x.longitude : DEFAULT_LONGITUDE
    // ));

    // Show all places
    const [allPlaces, setAllPlaces] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [allComment, setComment] = useState([])
    const allPlaceService = placeServiceFactory();
    // const allCommentService = commentServiceFactory();

    const [place, dispatch] = useReducer(placeReducer, {});

    // const { onCreateCommentSubmit } = useCommentContext();
    // const { values, onSubmit } = useForm({
    //     id: '',
    //     text: '',
    //     place_comment_id: '',
    //     user_id: '',
    //     owner: '',
    // }, onCreateCommentSubmit);


    useEffect(() => {
        allPlaceService.getAll()
            .then(result => {
                setAllPlaces(result)
            })
    }, [])

    // For comment


    // useEffect(() => {
    //     allCommentService.getAll()
    //         .then(result => {
    //             setComment(result)
    //         })
    // }, [])

    // useEffect(() => {
    //     allCommentService.getOne()
    //         .then(result => {
    //             setComment(result)
    //         })
    // }, [])

    const compareIdPlace = (placeId, placeIdInComment) => {
        let isEqual = false
        if (placeId === placeIdInComment) {
            isEqual = true
        }
        return isEqual
    }

    // const onCommentSubmit = async (values) => {
    //     const response = await allCommentService.create(values.comment);
    //     // const response = await create(values.comment);

    //     dispatch({
    //         type: 'COMMENT_ADD',
    //         payload: response,
    //         userName,
    //     })
    // };

    const takeIdPlace = (id) => {
        return id
    }

    // For comment


    // Show all places

    const customIcon = new Icon({
        iconUrl: require('../../img/paragliding.png'),
        iconSize: [49, 49]
    })

    const customIconLanding = new Icon({
        iconUrl: require('../../img/target.png'),
        iconSize: [49, 49]
    })

    // This is our custom icon for cluster
    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount() / 2}</div>`,
            className: "custom-marker-cluster",
            // iconSize: point(33, 33, true),
        });
    }

    const showSuitableDirection = (direction_length, uniqueKey) => {
        let dir = ''
        for (let i = 0; i < direction_length.length; i++) {
            // dir.push(<h1 key={`${uniqueKey}${direction_length}`}>Hellllo {direction_length[i]}</h1>)
            dir = <p key={`${uniqueKey}${direction_length}`}> {direction_length[i]}</p>
        }
        return dir
    }

    const { isAuthenticated, userId, userEmail, userName, userAuth, userAge, userFirstName } = useContext(AuthContext);
    const isOwner = (placeOwner, ownerId) => {
        if (placeOwner === ownerId) {
            return true
        }
    }

    const takeInfoForComment = () => {

    }

    // This is for find my location
    const LocationMarker = () => {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);

        const map = useMap();

        useEffect(() => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.zoom=13);
                // map.flyTo(e.latlng, map.getZoom());
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, [map]);

    }
    // This is for find my location

    
    return (
        <div className="sectionStyle">
            {/* cosnt positionCenter = [42.5233, 24.7334] */}
            {/* <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[latitudes, longitudes]} zoom={5} > */}
            <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[44.158567, 9.213165]} zoom={5} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustomClusterIcon}>

                    {allPlaces.map(marker => (
                        <Marker position={[marker.latitude_takes_off, marker.longitude_takes_off]} icon={customIcon} key={marker.latitude_takes_off}>
                            <Popup >Launch place {marker.place} {takeIdPlace(marker.id)}
                                <p>{marker.description_launch}</p>

                                <li className='placeDetails'>
                                    <Link className='placeDetailsLink' to={`/place-details/${marker.id}`}>Details</Link>
                                </li>

                                <p>{marker.longitude_takes_off}, {marker.latitude_takes_off}</p>
                                <p>{marker.longitude_landing}, {marker.latitude_landing}</p>
                                
                            </Popup>
                        </Marker>
                    ))}
                    {allPlaces.map(marker => (
                        <Marker position={[marker.latitude_landing, marker.longitude_landing]} icon={customIconLanding} key={marker.longitude_landing}>
                            <Popup>Landing place {marker.place}
                                <p>{marker.description_landing}</p>
                            </Popup>
                        </Marker>
                    ))}

                </MarkerClusterGroup>
                {/* This is for find my location */}
                <LocationMarker />
                {/* This is for find my location */}
            </MapContainer>
        </div >
    )
}

export default Section