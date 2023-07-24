import { useEffect } from "react"
import { useMap } from "react-leaflet";

// This is for search when location is turned off
export const SearchPlaceLocationOff = ({
    searchingData,
}) => {
    const map = useMap()
    useEffect(() => {
        map.flyTo(searchingData ? searchingData : [44.158567, 9.213165], searchingData ? map.zoom = 13 : map.zoom = 5)
    }, [searchingData])
    
    return null
}
// This is for search when location is turned off