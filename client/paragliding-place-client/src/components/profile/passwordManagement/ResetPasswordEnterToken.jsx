import { useState } from "react";

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import { isEqualAndHaveLength } from "../../../validators/validators";

import "../profile.modules.css"

export const ResetPasswordEnterToken = () => {
    const { onCreateNewPassword } = useAuthContext();

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [token, setToken] = useState();

    const { changeHandler, onSubmit } = useForm(onCreateNewPassword)

    const passwordAndConfirmPassordIsEqual = password && token ? isEqualAndHaveLength(password, confirmPassword) : false


    return (
        <>
            <div className="container">
                <div className="twoColumGrid">
                    {/* <div className="leftSide"></div> */}
                    <form onSubmit={onSubmit}>
                        <div className="rightSide">
                            <div className="topAndBottom">
                                <div className="containerItem">
                                    <h1>Reset Password</h1>
                                    <label htmlFor="password">New Password:
                                        <input
                                            className="changePasswordToken"
                                            type="password"
                                            id="password"
                                            name='password'
                                            onInput={e => setPassword(e.target.value)}
                                            onChange={changeHandler}

                                        />
                                    </label>
                                    <label htmlFor="confirm-password">Confirm New Password:
                                        <input
                                            className="changePasswordToken"
                                            type="password"
                                            id="confirm-password"
                                            name='confirm-password'
                                            onInput={e => setConfirmPassword(e.target.value)}
                                            onChange={changeHandler}

                                        />
                                    </label>
                                    <label htmlFor="token">Code:
                                        <input
                                            className="changePasswordToken"
                                            type="token"
                                            id="token"
                                            name='token'
                                            onInput={e => setToken(e.target.value)}
                                            onChange={changeHandler}

                                        />
                                    </label>
                                </div>
                                {
                                    passwordAndConfirmPassordIsEqual ?
                                        <input type="submit" value="Reset Password" />
                                        :
                                        <input type="submit" value="Reset Password" title="You have to fill all fields" disabled />
                                }

                            </div>

                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}