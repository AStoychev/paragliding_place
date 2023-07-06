import { useForm } from '../../hooks/useForm';

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

import { useService } from "../../hooks/useService";

import { profileServiceFactory } from "../../services/profileService";

import { IoIosMan, IoIosWoman } from "react-icons/io";
import { BsEmojiNeutralFill, BsEmojiNeutral } from "react-icons/bs";
import styles from "./profile.modules.css"

export const EditProfile = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, isAuthenticated, onProfileEditSubmit, isOwner, userName, userEmail, userFirstName, userLastName, userAge, userCountry, userGender } = useAuthContext();

    const profileService = useService(profileServiceFactory);

    const [user, setUser] = useState([]);

    const [newGender, setNewGender] = useState(null);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        first_name: '',
        last_name: '',
        age: '',
        // gender: '',
    }, onProfileEditSubmit)

    useEffect(() => {
        profileService.getOne(userId)
            .then(result => {
                changeValues(result);
            });
    }, [userId])

    useEffect(() => {
        Promise.all([
            profileService.getOne(profileId)
        ]).then(result => {
            setUser(result)
        })
    }, [])

    const onGenderChange = (e) => {
        values.gender = newGender
    }

    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    <h3>Edit Profile</h3>
                    {/* <div className="leftSide"></div> */}
                    <form method='POST' onSubmit={onSubmit}>
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

                                    <div className="item">
                                        <ul>
                                            <h1>{values.username}</h1>
                                            <p>First Name:
                                                <input
                                                    type="text"
                                                    id="first_name"
                                                    name='first_name'
                                                    value={values.first_name}
                                                    onChange={changeHandler}
                                                />
                                            </p>
                                            <p>Last Name:
                                                <input
                                                    type="text"
                                                    id="last_name"
                                                    name='last_name'
                                                    value={values.last_name}
                                                    onChange={changeHandler}
                                                />
                                            </p>
                                            <p>Age:
                                                <input
                                                    type="number"
                                                    id="age"
                                                    name="age"
                                                    value={values.age}
                                                    onChange={changeHandler}
                                                />
                                            </p>

                                            <div className="genderDiv">Gender: {values.gender} <br></br>

                                                <label className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <IoIosMan className="genderIcon" onClick={() => setNewGender("Male")} color={values.gender == "Male" ? "#ffc107" : "black"} />
                                                </label>

                                                <label className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <IoIosWoman className="genderIcon" onClick={() => setNewGender("Female")} color={values.gender == "Female" ? "#ffc107" : "black"} />
                                                </label>

                                                <label className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <BsEmojiNeutralFill className="genderIcon" onClick={() => setNewGender("Neuter")} color={values.gender == "Neuter" ? "#ffc107" : "black"} />
                                                </label>

                                            </div>
                                        </ul>
                                    </div>


                                </div>
                                <input type="submit" value="Edit" />
                            </div>

                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}