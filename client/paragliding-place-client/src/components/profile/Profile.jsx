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


    const isOwner = (placeOwner, ownerId) => {
        if (placeOwner === ownerId) {
            return true
        }
    }

    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    <div className="rightSide">
                        <div className="topAndBottom">
                            <div>
                                <div className="itemDirection">
                                    <h1>
                                        {userName}
                                    </h1>
                                </div>
                            </div>
                            <div className="containerItem">
                                {/* {Object.values(user).map(x => (
                                    <div key={x.id}>{x.first_name}</div>
                                ))} */}

                                {user.map(x => (
                                    <div className="item" key={x.id}>
                                        <h3>Full Name</h3>
                                        <p>{x.first_name}</p>
                                        <p>{x.last_name}</p>
                                        <h3>Age:{x.age}</h3>
                                        <p></p>
                                    </div>
                                ))}




                                <div className="item">
                                    <h3>Landing Coordinates</h3>
                                    <p>County{userCountry} </p>
                                    <p>Longitute:</p>
                                    <h3>Description</h3>
                                    <p></p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div >


        </>
    )
}