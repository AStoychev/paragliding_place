import { useForm } from '../../../hooks/useForm';

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthContext } from "../../../contexts/AuthContext";

import { useService } from "../../../hooks/useService";

import { profileServiceFactory } from "../../../services/profileService";

import { findEmptyValue } from '../../../validators/validators';

import { EditButton } from '../../../utils/buttons/EditButton';
import { BackButton } from '../../../utils/buttons/BackButton';

import { IoIosMan, IoIosWoman } from "react-icons/io";
import { BsEmojiNeutralFill, BsEmojiNeutral } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import styles from "./EditProfile.module.css"

export const EditProfile = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, isAuthenticated, onProfileEditSubmit } = useAuthContext();

    const profileService = useService(profileServiceFactory);

    const [user, setUser] = useState([]);

    const [newGender, setNewGender] = useState(null);
    const [visiblility, setVisibility] = useState(null);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        first_name: '',
        last_name: '',
        age: '',
    }, onProfileEditSubmit)

    for (let key in values) {
        if (!values[key]) {
            values[key] = ""
        }
    }

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

    const backButtonUrl = `http://localhost:3000/profile/${profileId}`

    const [hover, setHover] = useState(null);
    const onHoverLetter = (letter) => {
        if (hover === letter) {
            return "#ffc107"
        }
        return "black"
    }

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.editProfileHeader}>{values.username} - Account Settings</h3>
                <div className={styles.twoColumGrid}>
                    <form method='POST' onSubmit={onSubmit}>
                        <div className={styles.rightSide}>
                            <div className={styles.containerItem}>

                                <div className={styles.leftSide}>
                                    <img src="../../images/team.png" alt="Setting" />
                                </div>

                                <div className={styles.item}>
                                    <ul>
                                        <div className="formGroup">
                                            <div className={styles.mainInformationProfile}>
                                                <label className={styles.oneLineLabel} htmlFor="firstName">First Name:
                                                    <input
                                                        type="text"
                                                        className={styles.oneLineInput}
                                                        id="firstName"
                                                        name='first_name'
                                                        value={values.first_name}
                                                        onChange={changeHandler}
                                                    />
                                                </label>

                                                <label className={styles.oneLineLabel} htmlFor="lastName">Last Name:
                                                    <input
                                                        type="text"
                                                        className={styles.oneLineInput}
                                                        id="lastName"
                                                        name='last_name'
                                                        value={values.last_name}
                                                        onChange={changeHandler}
                                                    />
                                                </label>


                                                <label className={styles.oneLineLabel} htmlFor="age">Age:
                                                    <input
                                                        type="number"
                                                        className={styles.oneLineInput}
                                                        id="age"
                                                        name="age"
                                                        value={values.age}
                                                        onChange={changeHandler}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <div className={styles.emailVisibilityDiv}>Email Visibility: {values.email_visibility} <br></br>
                                                <div className={styles.emailVisibilityWrapper}>
                                                    <label htmlFor='emailInvisible' className={styles.labelGender} onChange={changeHandler}>
                                                        <input
                                                            type="radio"
                                                            id="emailInvisible"
                                                            name="rating"
                                                            value={values.email_visibility}
                                                            onChange={onVisibilityChange}
                                                        />
                                                        <AiOutlineEyeInvisible
                                                            className={styles.genderIcon}
                                                            title="Invisible"
                                                            onClick={() => setVisibility("Invisible")}
                                                            color={values.email_visibility === "Invisible" ? "#ffc107" : "black"
                                                                &&
                                                                onHoverLetter("Invisible")}
                                                            onMouseEnter={() => setHover("Invisible")}
                                                            onMouseLeave={() => setHover(null)}
                                                        />
                                                    </label>
                                                    <label htmlFor='emailVisible' className={styles.labelGender} onChange={changeHandler}>
                                                        <input
                                                            type="radio"
                                                            id="emailVisible"
                                                            name="rating"
                                                            value={values.email_visibility}
                                                            onChange={onVisibilityChange}
                                                        />
                                                        <AiOutlineEye
                                                            className={styles.genderIcon}
                                                            title="Visible"
                                                            onClick={() => setVisibility("Visible")}
                                                            color={values.email_visibility === "Visible" ? "#ffc107" : "black"
                                                                &&
                                                                onHoverLetter("Visible")}
                                                            onMouseEnter={() => setHover("Visible")}
                                                            onMouseLeave={() => setHover(null)}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className={styles.genderDiv}>Gender: {findEmptyValue(values.gender)} <br></br>

                                                <label htmlFor="ratingMale" className={styles.labelGender} onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="ratingMale"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <IoIosMan
                                                        className={styles.genderIcon}
                                                        title="Male"
                                                        onClick={() => setNewGender("Male")}
                                                        color={values.gender === "Male" ? "#ffc107" : "black"
                                                            &&
                                                            onHoverLetter("Male")}
                                                        onMouseEnter={() => setHover("Male")}
                                                        onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>

                                                <label htmlFor="ratingFemale" className={styles.labelGender} onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="ratingFemale"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <IoIosWoman
                                                        className={styles.genderIcon}
                                                        title="Female"
                                                        onClick={() => setNewGender("Female")}
                                                        color={values.gender === "Female" ? "#ffc107" : "black"
                                                            &&
                                                            onHoverLetter("Female")}
                                                        onMouseEnter={() => setHover("Female")}
                                                        onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>

                                                <label htmlFor="ratingNeuter" className={styles.labelGender} onChange={changeHandler}>
                                                    <input
                                                        type="radio"
                                                        id="ratingNeuter"
                                                        name="rating"
                                                        value={values.gender}
                                                        onChange={onGenderChange}
                                                    />
                                                    <BsEmojiNeutralFill
                                                        className={styles.genderIcon}
                                                        title="Neuter"
                                                        onClick={() => setNewGender("Neuter")}
                                                        color={values.gender === "Neuter" ? "#ffc107" : "black"
                                                            &&
                                                            onHoverLetter("Neuter")}
                                                        onMouseEnter={() => setHover("Neuter")}
                                                        onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>

                                            </div>

                                            <div className={styles.changePasswordDiv}>Change Password<br></br>
                                                <Link className={styles.changePasswordLink} to={`/profile/edit/change-password/${userId}`} title="Change Password">
                                                    <img src="../../images/key.png" alt="Change Password" />
                                                </Link>
                                            </div>

                                        </div>
                                    </ul>
                                </div>

                            </div>

                            <div className={styles.submitBtn}>
                                <EditButton />
                                <BackButton backButtonUrl={backButtonUrl} />
                            </div>

                        </div>

                    </form>
                </div>

            </div >
        </>
    )
}