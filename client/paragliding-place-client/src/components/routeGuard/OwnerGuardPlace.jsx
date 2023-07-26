import { Navigate, Outlet, useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { usePlaceContext } from "../../contexts/PlaceContext";

export const OwnerGuardPlace = ({
    children,
}) => {
    const { placeId } = useParams();
    const { getPlace } = usePlaceContext();
    const { userId } = useAuthContext();

    const currentPlace = getPlace(Number(placeId));

    if (currentPlace && currentPlace.user_id !== userId) {
        return <Navigate to={`/place-details/${placeId}/detail`} />;
    }

    return children ? children : <Outlet />


}