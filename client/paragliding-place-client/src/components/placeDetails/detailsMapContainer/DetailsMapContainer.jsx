import { useEffect } from "react"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { createCustomClusterIcon, customIcon, customIconLanding } from "../../customIcon/customIcon";

import "leaflet/dist/leaflet.css";
import styles from "../detailsMapContainer/DetailsMapContainer.modules.css"

export const DetailsMapContainer = ({
    place,
    allPlaces,
}) => {

    const placeCenterLatitude = parseFloat(place.latitude_takes_off);
    const placeCenterLongitude = parseFloat(place.longitude_takes_off);

    // For current place
    const GoToPlace = () => {
        const checkForCoordinates = () => {
            if (isNaN(placeCenterLatitude) && isNaN(placeCenterLongitude)) {
                return [44.158567, 9.213165]
            }
            return [placeCenterLatitude, placeCenterLongitude]
        }
        const map = useMap()
        useEffect(() => {
            map.flyTo(
                checkForCoordinates(), map.zoom = 16
            )
        }, [])
    }
    // For current place

    return (
        <div className="leftSideDetails">
            <MapContainer style={{ height: "100%", minHeight: "100%" }} className="mapContainer" center={[0.000000, 0.000000]} zoom={3} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                    attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GoToPlace />
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