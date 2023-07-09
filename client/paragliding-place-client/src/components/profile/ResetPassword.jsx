import { useState } from "react";
import { useParams } from "react-router-dom"

import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { isEqualAndHaveLength } from "../../validators/validators";

import { profileServiceFactory } from "../../services/profileService";

import "./profile.modules.css"
import { useService } from "../../hooks/useService";

export const ResetPassword = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, onResetPassword } = useAuthContext();

    const [email, setEmail] = useState();

    const profileService = useService(profileServiceFactory);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        email: '',
    }, onResetPassword)

    console.log(email)

    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    {/* <div className="leftSide"></div> */}
                    <form onSubmit={onSubmit}>
                        <div className="rightSide">
                            <div className="topAndBottom">
                                <div className="containerItem">
                                    <h1>Change Password</h1>

                                    <label htmlFor="email">Email:
                                        <input
                                            type="email"
                                            id="email"
                                            name='email'
                                            onInput={e => setEmail(e.target.value)}
                                            onChange={changeHandler}

                                        />
                                    </label>
                                </div>
                                    <input type="submit" value="Reset Password" />
                                
                            </div>

                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}