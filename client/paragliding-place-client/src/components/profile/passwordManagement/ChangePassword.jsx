import { useParams } from "react-router-dom"

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import { isEqualAndHaveLength } from "../../../validators/validators";

import { ChangePasswordEnable } from "../../../utils/buttons/ChangePasswordEnable";
import { ChangePasswordDisabled } from "../../../utils/buttons/ChangePasswordDisabled"

import styles from "./PasswordManagemetn.module.css"

export const ChangePassword = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, onChangePassword, thisError } = useAuthContext();

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        id: userId,
        password: '',
        new_password: '',
        confirm_password: '',
    }, onChangePassword)

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h3 className={styles.header}>Change Password</h3>
                    <form onSubmit={onSubmit}>
                        <div className={styles.changePasswordDiv}>

                            <label htmlFor="oldPassword" className={styles.passwordLabel}>Old Password:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="password"
                                        id="oldPassword"
                                        name='password'
                                        value={values.password}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </label>
                            <label className={styles.passwordLabel} htmlFor="new_password">New Password:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="password"
                                        id="new_password"
                                        name='new_password'
                                        value={values.new_password}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </label>
                            <label className={styles.passwordLabel} htmlFor="confirm_password">Confirm New Password:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="password"
                                        id="confirm_password"
                                        name='confirm_password'
                                        value={values.confirm_password}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </label>

                        </div>

                        {thisError &&
                        <p className={styles.showErrors}>{thisError}</p>
                        }
                        <div className={styles.buttonChange}>
                            {isEqualAndHaveLength(values.new_password, values.confirm_password) && values.password !== "" ?
                                <ChangePasswordEnable />
                                :
                                <ChangePasswordDisabled />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}