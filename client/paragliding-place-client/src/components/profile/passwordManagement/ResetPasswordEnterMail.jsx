import { useState } from "react";

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";

import Spinner from 'react-bootstrap/Spinner';
import "../profile.modules.css"


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
                                            disabled={disabled}
                                            onInput={e => setEmail(e.target.value)}
                                            onChange={changeHandler}

                                        />
                                    </label>
                                </div>
                                <div className="submitResetPassword">
                                    <input type="submit" onClick={fetchData} value="Reset Password" disabled={disabled} />

                                    {thisError ?
                                        <div className="showErrors">{thisError}</div>
                                        :
                                        loading &&
                                        <Spinner animation="border" variant="info" onAnimationStart={onSpinerLoad} />
                                    }

                                </div>
                            </div>

                        </div>
                    </form>
                </div >

            </div >
        </>
    )
}