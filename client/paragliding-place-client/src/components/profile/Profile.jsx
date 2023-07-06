import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

import { useService } from "../../hooks/useService";

import { profileServiceFactory } from "../../services/profileService";

import { DifficultyRating } from "../difficultyRating/DifficultyRating"

import styles from "./profile.modules.css"

export const Profile = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, isAuthenticated, isOwner, userName, userEmail, userFirstName, userLastName, userAge, userCountry, userGender } = useAuthContext();

    const profileService = useService(profileServiceFactory);

    const [user, setUser] = useState([]);

    useEffect(() => {
        Promise.all([
            profileService.getOne(profileId)
        ]).then(result => {
            setUser(result)
        })
    }, [])

    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    {/* <div className="leftSide"></div> */}
                    <div className="rightSide">
                        <div className="topAndBottom">
                            <div>
                                {/* <div className="itemDirection">
                                    <h1>
                                        {userName}
                                    </h1>
                                </div> */}
                            </div>
                            <div className="containerItem">

                                <div className="leftSide">

                                </div>

                                {user.map(x => (
                                    <div className="item" key={x.id}>
                                        <ul>
                                            <h1>{x.username}
                                                {isOwner(x.id, userId) &&
                                                    <Link className="buttonSetting" to={`/profile/edit/${x.id}`} title="Setting" ><img src="../images/setting.png" alt="Edit" /></Link>
                                                }
                                            </h1>
                                            <p>Name: {x.first_name} {x.last_name}</p>
                                            <p>Email: <a href={`mailto:${x.email}?subject = Feedback&body = Message`}>{x.email}</a></p>
                                            <p>Age: {x.age}</p>
                                            <p>Gender: {x.gender}</p>
                                            {/* <p key={x.id}>Country: {x.country}</p> */}
                                        </ul>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>
                </div>

            </div >
        </>
    )
}