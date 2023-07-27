import { useState, useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import { customIconMyLocation } from "../../../utils/customIcon/customIcon";

// This is for find my location
export const LocationMarker = ({
    searchingData,
}) => {
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
    }, [searchingData]);

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