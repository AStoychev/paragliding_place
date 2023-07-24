import { useState } from "react"


import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from "leaflet";

import { customIcon, customIconLanding } from "../../customIcon/customIcon";

import "leaflet/dist/leaflet.css";
import Spinner from 'react-bootstrap/Spinner';
import styles from "../detailsMapContainer/DetailsMapContainer.modules.css"

export const DetailsMapContainer = ({
    place,
    allPlaces,
}) => {

    const [clickHeader, setClickHeader] = useState(`Click On Map To See The Start`);
    const [headerSpiner, setHeaderSpiner] = useState(<Spinner animation="grow" size="sm" />);

    const placeCenterLatitude = parseFloat(place.latitude_takes_off);
    const placeCenterLongitude = parseFloat(place.longitude_takes_off);

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

    return (
        <div className="leftSideDetails">
            <h3 className="headerMap">{clickHeader}{headerSpiner}</h3>
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
    )
}