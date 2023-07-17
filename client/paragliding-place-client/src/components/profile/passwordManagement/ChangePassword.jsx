import { useParams } from "react-router-dom"

import { useForm } from "../../../hooks/useForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import { isEqualAndHaveLength } from "../../../validators/validators";

import "../profile.modules.css"

export const ChangePassword = () => {
    const userProfileId = useParams()
    const profileId = userProfileId['userId']

    const { userId, onChangePassword } = useAuthContext();

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        id: userId,
        password: '',
        new_password: '',
        confirm_password: '',
    }, onChangePassword)

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

                                    <label htmlFor="oldPassword">Old Password:
                                        <input
                                            type="password"
                                            id="oldPassword"
                                            name='old_password'
                                            onChange={changeHandler}

                                        />
                                    </label>
                                    <label htmlFor="new_password">New Password:
                                        <input
                                            type="password"
                                            id="new_password"
                                            name='new_password'
                                            onChange={changeHandler}

                                        />
                                    </label>

                                    <label htmlFor="confirm_password">Confirm New Password:
                                        <input
                                            type="password"
                                            id="confirm_password"
                                            name='confirm_password'
                                            onChange={changeHandler}

                                        />
                                    </label>
                                </div>
                                {isEqualAndHaveLength(values.new_password, values.confirm_password) ?
                                    <input type="submit" value="Change Password" />
                                    :
                                    <input type="submit" value="Change Password" disabled={true} />
                                }
                            </div>

                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}