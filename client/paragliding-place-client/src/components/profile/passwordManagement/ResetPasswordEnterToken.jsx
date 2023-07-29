import { useState } from "react";

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import { isEqualAndHaveLength } from "../../../validators/validators";

import { ResetPasswordEnable } from "../../../utils/buttons/ResetPasswordEnable";
import { ResetPassowrdDisabled } from "../../../utils/buttons/ResetPasswordDisabled";

import styles from "./PasswordManagemetn.module.css"

export const ResetPasswordEnterToken = () => {
    const { onCreateNewPassword, thisError } = useAuthContext();

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [token, setToken] = useState();

    const { changeHandler, onSubmit } = useForm({
        password: '',
        token: '',
    }, onCreateNewPassword)

    const passwordAndConfirmPassordIsEqual = password && token ? isEqualAndHaveLength(password, confirmPassword) : false


    return (
        <>
            <div className={styles.container}>
                <div>
                    <h3 className={styles.header}>Reset Password</h3>
                    <form onSubmit={onSubmit}>
                        <div className={styles.changePasswordDiv}>

                            <label htmlFor="password" className={styles.passwordLabel}>New Password:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="password"
                                        id="password"
                                        name='password'
                                        onInput={e => setPassword(e.target.value)}
                                        onChange={changeHandler}

                                    />
                                </div>
                            </label>
                            <label className={styles.passwordLabel} htmlFor="confirm-password">Confirm New Password:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="password"
                                        id="confirm-password"
                                        name='confirm-password'
                                        onInput={e => setConfirmPassword(e.target.value)}
                                        onChange={changeHandler}

                                    />
                                </div>
                            </label>
                            <label className={styles.passwordLabel} htmlFor="token">Code:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="token"
                                        id="token"
                                        name='token'
                                        onInput={e => setToken(e.target.value)}
                                        onChange={changeHandler}

                                    />
                                </div>
                            </label>

                        </div>

                        {thisError &&
                            <p className={styles.showErrors}>{thisError}</p>
                        }

                        <div className={styles.restPasswordTokenButton}>
                            {
                                passwordAndConfirmPassordIsEqual ?
                                    <ResetPasswordEnable />
                                    :
                                    <ResetPassowrdDisabled />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}