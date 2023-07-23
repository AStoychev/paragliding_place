import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { placeServiceFactory } from "../../services/placeService";

import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayerGroup, Circle, Pane } from "react-leaflet";
import { Icon, divIcon, latLng, map } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Search
import { Search } from "../search/Search";
// Search

import { customIcon, customIconLanding, customIconMyLocation } from "../customIcon/customIcon";

import "leaflet/dist/leaflet.css";

import "./style.css"

export const Section = () => {

    const [myLocation, setMyLocation] = useState(false);
    const [disableMyLocation, setDisableMyLocation] = useState(true);

    // Show all places
    const [allPlaces, setAllPlaces] = useState([]);
    const allPlaceService = placeServiceFactory();

    useEffect(() => {
        allPlaceService.getAll()
            .then(result => {
                setAllPlaces(result)
            })
    }, [])

    const takeIdPlace = (id) => {
        return id
    }

    // This is our custom icon for cluster
    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon"><img src="../images/pin.png" alt="location" title="Click to see details"/></div>`,
            // html: `<div class="cluster-icon">${cluster.getChildCount() / 2}</div>`,
            className: "custom-marker-cluster",
            // iconSize: point(33, 33, true),
        });
    }

    // Search
    const [searchingData, setSearchingData] = useState("");
    const [found, setFound] = useState(true);

    const getDataFromSearch = (newData) => {
        const foundLocation = allPlaces.some(el =>
            el.place.toLowerCase() === newData.toLowerCase()
        )
        setFound(foundLocation)
        setTimeout(() => setFound(true), 1500)

        allPlaces.map(item => {
            if (item.place.toLowerCase() === newData.toLowerCase()) {
                setSearchingData([item.latitude_takes_off, item.longitude_takes_off]);
            }
        })
    }
    // Search

    // This is for find my location
    const LocationMarker = () => {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);

        const map = useMap();

        useEffect(() => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);

                // This is for button how return to my location
                if (e.latlng) {
                    setDisableMyLocation(false)
                }

                if (myLocation) {
                    map.flyTo(e.latlng, map.zoom = 13);
                    setMyLocation(false);
                }
                // This is for button how return to my location

                map.flyTo(searchingData ? searchingData : e.latlng, map.zoom = 13);
                // map.flyTo(e.latlng, map.getZoom());
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, [map]);

        return position === null ? null : (
            <Marker position={position} icon={customIconMyLocation}>
                <Popup>
                    You are here. <br />
                    <b>Southwest lng</b>: {bbox[0]} <br />
                    <b>Southwest lat</b>: {bbox[1]} <br />
                    <b>Northeast lng</b>: {bbox[2]} <br />
                    <b>Northeast lat</b>: {bbox[3]}
                </Popup>
            </Marker>
        )

    }
    // This is for find my location


    // This is for search when location is turned off
    const SearchPlaceLocationOff = () => {
        const map = useMap()
        useEffect(() => {
            map.flyTo(searchingData ? searchingData : [44.158567, 9.213165], searchingData ? map.zoom = 13 : map.zoom = 5)
        }, [searchingData])
        return null
    }
    // This is for search when location is turned off

    // Return to my location
    const GoToMyLocation = ({
        disableMyLocation,
    }) => {
        // const [myLocation, setMyLocation] = useState(false)
        return (
            <div className="transitionButton">
                {!disableMyLocation ?
                    <img onClick={() => setMyLocation(true)} src="../images/navigation.png" alt="My Location" title="Go To My Location"></img>
                    :
                    <img className="notLocationImage" src="../images/notNavigation.png" alt="Not Location" title="Your Location is Turn Off"></img>
                }
            </div>
        )
    }
    // Return to my location

    return (
        <div className="sectionStyle">
            <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[44.158567, 9.213165]} zoom={5} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <div className="search-container">
                    <Search found={found} getDataFromSearch={getDataFromSearch} />
                    <GoToMyLocation disableMyLocation={disableMyLocation} />
                </div>

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustomClusterIcon}>

                    {allPlaces.map(marker => (
                        <Marker position={[marker.latitude_takes_off, marker.longitude_takes_off]} icon={customIcon} key={marker.latitude_takes_off}>
                            <Popup>Launch place {marker.place} {takeIdPlace(marker.id)}
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

                {/* This is for search place when location is off */}
                <SearchPlaceLocationOff />
                {/* This is for search place when location is off */}
            </MapContainer>
        </div >
    )
}

export default Section