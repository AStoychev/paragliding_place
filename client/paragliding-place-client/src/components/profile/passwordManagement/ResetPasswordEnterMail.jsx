import { useState } from "react";

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";

import { ResetPasswordButton } from "../../../utils/buttons/ResetPasswordButton";

import Spinner from 'react-bootstrap/Spinner';
import styles from "./PasswordManagemetn.module.css"


export const ResetPasswordEnterMail = () => {

    const { onResetPassword, thisError } = useAuthContext();

    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false)

    const fetchData = () => {
        setLoading(true)
    };

    const onSpinerLoad = () => {
        setDisabled(true)
    }

    const { changeHandler, onSubmit } = useForm({
        email: '',
    }, onResetPassword)

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h3 className={styles.header}>Reset Password</h3>
                    <form onSubmit={onSubmit}>
                        <div className={styles.resetPasswordDiv}>
                            <label className={styles.passwordLabel} htmlFor="email">Email:
                                <div className={styles.passwordDiv}>
                                    <input
                                        className={styles.changePasswordInput}
                                        type="email"
                                        id="email"
                                        name='email'
                                        disabled={disabled}
                                        onInput={e => setEmail(e.target.value)}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </label>

                            <div className={styles.submitResetPassword}>

                                {thisError ?
                                    <div className={styles.showErrorsResetPassword}>{thisError}</div>
                                    :
                                    loading &&
                                    <Spinner animation="border" variant="info" onAnimationStart={onSpinerLoad} />
                                }

                            </div>
                        </div>

                        <div className={styles.reserPasswordButtonDiv}>
                            <ResetPasswordButton fetchDate={fetchData} disabled={disabled} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}