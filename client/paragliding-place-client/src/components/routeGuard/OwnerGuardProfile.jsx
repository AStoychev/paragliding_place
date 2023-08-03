import { Navigate, Outlet, useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { usePlaceContext } from "../../contexts/PlaceContext";

export const OwnerGuardProfile = ({
    children,
}) => {
    const userProfileId = useParams();
    const { userId, isStaff } = useAuthContext();
    const profileId = Number(userProfileId["userId"])

    if (profileId !== userId && !isStaff) {
        return <Navigate to={`/profile/${profileId}`} />;
    }

    return children ? children : <Outlet />


}