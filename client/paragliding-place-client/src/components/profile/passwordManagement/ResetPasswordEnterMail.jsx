import { useState } from "react";

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";

import Spinner from 'react-bootstrap/Spinner';
import "../profile.modules.css"


export const ResetPasswordEnterMail = () => {

    const { onResetPassword } = useAuthContext();

    const [email, setEmail] = useState();

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
                                <div className="submitResetPassword">
                                    <input type="submit" value="Reset Password" />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}