import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

import { useService } from "../../hooks/useService";

import { profileServiceFactory } from "../../services/profileService";

import { isOwnerOrStaff, findEmptyValue } from "../../validators/validators";

import styles from "./Profile.module.css"

export const Profile = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, isStaff } = useAuthContext();

    const profileService = useService(profileServiceFactory);

    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            profileService.getOne(profileId)
        ]).then(result => {

            // Redirect to page not found
            if (result[0].length > 1) {
                navigate("/pageNotFound")
            }

            setUser(result)
        })
    }, [])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.twoColumGrid}>
                    <div className={styles.rightSide}>
                        <div className={styles.topAndBottom}>

                            <div className={styles.containerItem}>

                                <div className={styles.leftSide}>
                                    <img src="../../images/team.png" alt="Setting" />
                                </div>

                                {user.map(x => (
                                    <div className={styles.item} key={x.id}>
                                        <ul>
                                            <h1>{x.username}
                                                {isOwnerOrStaff(x.id, userId, isStaff) &&
                                                    <Link className={styles.buttonSetting} to={`/profile/edit/${x.id}`} title="Setting" ><img src="../images/setting.png" alt="Edit" /></Link>
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