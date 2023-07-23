import { Icon } from "leaflet";

export const customIcon = new Icon({
    iconUrl: require('../../img/paragliding.png'),
    iconSize: [49, 49]
})

export const customIconLanding = new Icon({
    iconUrl: require('../../img/target.png'),
    iconSize: [49, 49]
})

export const customIconMyLocation = new Icon({
    iconUrl: require('../../img/navigation.png'),
    iconSize: [30, 30]
})