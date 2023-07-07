import { useForm } from '../../hooks/useForm';

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

import { useService } from "../../hooks/useService";

import { profileServiceFactory } from "../../services/profileService";

import { findEmptyValue } from '../../services/validators';

import { IoIosMan, IoIosWoman } from "react-icons/io";
import { BsEmojiNeutralFill, BsEmojiNeutral } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import styles from "./profile.modules.css"

export const EditProfile = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, isAuthenticated, onProfileEditSubmit, isOwner, userName, userEmail, userFirstName, userLastName, userAge, userCountry, userGender } = useAuthContext();

    const profileService = useService(profileServiceFactory);

    const [user, setUser] = useState([]);

    const [newGender, setNewGender] = useState(null);
    const [visiblility, setVisibility] = useState(null);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        first_name: '',
        last_name: '',
        age: '',
    }, onProfileEditSubmit)

    for(let key in values){
        if(!values[key]) {
            values[key]=""
        }
    }

    // for(let i = 0; i < Object.values(values).length; i++){
    //     if(!Object.values(values)[i]){
    //         // console.log(111111, Object.values(values)[i])
    //         Object.values(values)[i] = "A";
    //         console.log(Object.values(values))
    //     };
    // };

    // if (!values.first_name) {
    //     values.first_name = "";
    // };

    // if (!values.last_name) {
    //     values.last_name = "";
    // };

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

    const onVisibilityChange = (e) => {
        values.email_visibility = visiblility
    }

    console.log(values)

    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    <h3>Edit Profile</h3>
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
                                            <label htmlFor="firstName">First Name:
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name='first_name'
                                                    value={values.first_name}
                                                    onChange={changeHandler}
                                                />
                                            </label>
                                            <label htmlFor="lastName">Last Name:
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name='last_name'
                                                    value={values.last_name}
                                                    onChange={changeHandler}
                                                />
                                            </label>
                                            <p>Email Visibility: {values.email_visibility === true ? "Visible" : "Unvisible"} <br></br>

                                                <label htmlFor='emailFalse' className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="emailFalse"
                                                        name="rating"
                                                        value={values.email_visibility}
                                                        onChange={onVisibilityChange}
                                                    />
                                                    <AiOutlineEyeInvisible className="genderIcon" onClick={() => setVisibility(false)} color={values.email_visibility == false ? "#ffc107" : "black"} />
                                                </label>

                                                <label htmlFor='emailTrue' className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="emailTrue"
                                                        name="rating"
                                                        value={values.email_visibility}
                                                        onChange={onVisibilityChange}
                                                    />
                                                    <AiOutlineEye className="genderIcon" onClick={() => setVisibility(true)} color={values.email_visibility == true ? "#ffc107" : "black"} />
                                                </label>

                                            </p>
                                            <label htmlFor="age">Age:
                                                <input
                                                    type="number"
                                                    id="age"
                                                    name="age"
                                                    value={values.age}
                                                    onChange={changeHandler}
                                                />
                                            </label>

                                            <div className="genderDiv">Gender: {findEmptyValue(values.gender)} <br></br>

                                                <label htmlFor="ratingMale" className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="ratingMale"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <IoIosMan className="genderIcon" onClick={() => setNewGender("Male")} color={values.gender == "Male" ? "#ffc107" : "black"} />
                                                </label>

                                                <label htmlFor="ratingFemale" className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="ratingFemale"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <IoIosWoman className="genderIcon" onClick={() => setNewGender("Female")} color={values.gender == "Female" ? "#ffc107" : "black"} />
                                                </label>

                                                <label htmlFor="ratingNeuter" className="labelGender" onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="ratingNeuter"
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