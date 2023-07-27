import { Icon, divIcon } from "leaflet";

// This is our custom icon for cluster
export const createCustomClusterIcon = (cluster) => {
    return new divIcon({
        html: `<div class="cluster-icon"><img src="../../../images/pin.png" alt="location" title="Click to see details"/></div>`,
        // html: `<div class="cluster-icon">${cluster.getChildCount() / 2}</div>`,
        className: "custom-marker-cluster",
        // iconSize: point(33, 33, true),
    });
}

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