import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

// Return to my location
export const GoToMyLocation = () => {
    const [myLocation, setMyLocation] = useState(false)

    const [disableMyLocation, setDisableMyLocation] = useState(true)

    const map = useMap();
    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setDisableMyLocation(false)

            if (myLocation) {
                map.flyTo(e.latlng, map.zoom = 13);
                setMyLocation(false);
            }
        })
    })

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