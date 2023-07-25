import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { placeServiceFactory } from "../../services/placeService";

import { LocationMarker } from "./mapComponents/LocationMarker";
import { GoToMyLocation } from "./mapComponents/GoToMyLocation";
import { SearchPlaceLocationOff } from "./mapComponents/SearchPlaceLocationOff";

import { Search } from "../search/Search";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { customIcon, customIconLanding } from "../customIcon/customIcon";
import "leaflet/dist/leaflet.css";
import "./style.css"

export const Section = () => {

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

    return (
        <div className="sectionStyle">
            <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[44.158567, 9.213165]} zoom={5} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <div className="search-container">
                    <Search found={found} getDataFromSearch={getDataFromSearch} />
                    <GoToMyLocation />
                </div>

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustomClusterIcon}>

                    {allPlaces.map(marker => (
                        <Marker position={[marker.latitude_takes_off, marker.longitude_takes_off]} icon={customIcon} key={marker.latitude_takes_off}>
                            <Popup>Launch place {marker.place} {takeIdPlace(marker.id)}
                                <p>{marker.description_launch}</p>

                                <li className='placeDetails'>
                                    <Link className='placeDetailsLink' to={`/place-details/${marker.id}/detail`}>Details</Link>
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
                <LocationMarker searchingData={searchingData} />
                {/* This is for find my location */}

                {/* This is for search place when location is off */}
                <SearchPlaceLocationOff searchingData={searchingData} />
                {/* This is for search place when location is off */}
            </MapContainer>
        </div >
    )
}

export default Section