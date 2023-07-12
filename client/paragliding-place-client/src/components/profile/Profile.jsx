import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

import { useService } from "../../hooks/useService";

import { profileServiceFactory } from "../../services/profileService";

import { isOwner, findEmptyValue } from "../../validators/validators";

import { DifficultyRating } from "../difficultyRating/DifficultyRating"

import "./profile.modules.css"

export const Profile = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, isAuthenticated, userName, userEmail, userFirstName, userLastName, userAge, userCountry, userGender } = useAuthContext();

    const profileService = useService(profileServiceFactory);

    const [user, setUser] = useState([]);

    useEffect(() => {
        Promise.all([
            profileService.getOne(profileId)
        ]).then(result => {
            setUser(result)
        })
    }, [])

    // const findEmptyValue = (value) => {
    //     if(value === 1) {
    //         return <span style={{fontSize: '15px', fontStyle: 'italic'}}>Not selected</span>
    //     }
    //     if(value === "No") {
    //         return <span style={{fontSize: '15px', fontStyle: "italic"}}>Not selected</span>
    //     }
    //     return value
    // }

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
                                            {x.email_visibility === "Visible" &&
                                                <p>Email: <a href={`mailto:${x.email}?subject = Feedback&body = Message`}>{x.email}</a></p>
                                            }
                                            <p>Age: {findEmptyValue(x.age)}</p>
                                            <p>Gender: {findEmptyValue(x.gender)}</p>
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