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

    // Search
    const [searchingData, setSearchingData] = useState("");

    const getDataFromSearch = (newData) => {
        setSearchingData(newData);
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
                map.flyTo(searchingData ? searchingData : e.latlng, map.zoom = 13);
                // map.flyTo(e.latlng, map.getZoom());
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, [map]);

    }
    // This is for find my location

    const [latNotLocation, setLatNotLocation] = ([44.158567])
    const [lngNotLocation, setLangNotLocation] = ([9.213165])
    const notLocateDirection = [latNotLocation, lngNotLocation]

    // useEffect(() => {
    //     setLatNotLocation(() => 44.158567 * 2);
    //     setLangNotLocation(() => 9.213165 * 2);
    // }, [])

    // useEffect(() => {
    //     notLocateDirection.map(x => (
    //         searchingData
    //         ?
    //         setLatNotLocation(() => searchingData[0])
    //         &&
    //         setLangNotLocation(() => searchingData[1])
    //         :
    //         setLatNotLocation(() => [44.158567])
    //         &&
    //         setLangNotLocation(() => [9.213165])
    //     ))
            
    // }, [])

    // const searchNotLocate = () => {
    //     if (searchingData) {
    //         setLatNotLocation(() => searchingData[0]);
    //         setLangNotLocation(() => searchingData[1])
    //     }
    // }

    // useEffect(() => {
    //     notLocateDirection.map()
    //         .then(
    //             searchingData
    //             ?
    //             () => setLangNotLocation(searchingData[0])
    //             :
    //             () => setLangNotLocation(searchingData[1])
    //         )
    // }, [])

    return (
        <div className="sectionStyle">
            <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[44.158567, 9.213165]} zoom={5} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <div className="search-container">
                    <Search getDataFromSearch={getDataFromSearch} />
                </div>

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