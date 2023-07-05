import React, { useState } from 'react';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import styles from '../login/LoginRegister.module.css';

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        username: '',
        age: '',
        password: '',
        confirmPassword: '',

    }, onRegisterSubmit);

    const [checkEmai, setEmail] = useState("");
    const [checkUsername, setUsername] = useState("")
    const [pass, setPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");


    let count = 0;

    const onBlurEmail = (e) => {
        count = 0;
        setEmail(count);
    }

    const onBlurUsername = (e) => {
        count = 0;
        setUsername(count);
    }

    const onBlurPass = (e) => {
        count = 0;
        setPass(count);
    }

    const onBlurRepeatPassword = (e) => {
        count = 0;
        setPass(count);
        setRepeatPass(count);

    }

    const onClickEmail = (e) => {
        if (e) {
            count = 1;
            setEmail(count);
        }
    }

    const onClickUsername = (e) => {
        if (e) {
            count = 1;
            setUsername(count);
        }
    }

    const onClickPassword = (e) => {
        if (e) {
            count = 1;
            setPass(count);
        }
    }

    const onClickConfirmPassword = (e) => {
        let count = 0;
        if (e) {
            count = 1;
            setRepeatPass(count);
        }
    }

    const emailValidation = (emailValue) => {
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (emailValue.match(emailFormat)) {
            return true
        } else {
            return false
        }
    }

    const usernameValidation = (usernameValue) => {
        let usernameFormat = /[A-Z][a-z]*/

        if (usernameValue.match(usernameFormat) && usernameValue.length >= 2) {
            return true
        } else {
            return false
        }
    }

    const isEqual = () => {
        if (values.password === values.confirmPassword && (values.password).length >= 6 && (values.confirmPassword).length >= 6) {
            return true
        }
    }

    const isRequired = []
    const items = (Object.values(values));

    const isFull = () => {
        if (isRequired.length === items.length) {
            return true
        } else {
            return false
        }
    }

    for (let i = 0; i < items.length; i++) {
        if ((items[i].length) > 0) {
            isRequired.push(1)
        }
    }

    // Email exist error
    let { errorEmail } = useContext(AuthContext);

    const checkForErrorEmail = () => {
        if (Object.values(errorEmail).length > 0) {
            return true
        }
    }


    // Email exist error

    return (
        <div className={styles.container}>
            <section id={styles.registerPage} className="content auth">
                <form id="register" method='POST' onSubmit={onSubmit}>
                    <div className={styles.container}>
                        <h1 className={styles.header}>Register</h1>
                        <div className={styles.fieldRegister}>

                            <label className={styles.htmlContent} htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id={styles.email}
                                name="email"
                                placeholder="livingwall@gmail.com"
                                value={values.email}
                                onChange={changeHandler}
                                onClick={onClickEmail}
                                onBlur={onBlurEmail}
                            />
                            {checkEmai === 1 && (values.email).length >= 1 &&
                                <p > {emailValidation(values.email) === true ?
                                    <span style={{ color: "blue", margin: "35%", paddingLeft: "11.5%" }}>Email is valid!</span>
                                    :
                                    <span style={{ color: "red", margin: "11.5%", padding: "33%" }}>Email is not valid!</span>
                                }
                                </p>
                            }

                            <label className={styles.htmlContent} htmlFor="username">Username:</label>
                            <input
                                type="username"
                                id={styles.username}
                                name="username"
                                placeholder="Username"
                                value={values.username}
                                onChange={changeHandler}
                                onClick={onClickUsername}
                                onBlur={onBlurUsername}
                            />
                            {checkUsername === 1 && (values.username).length >= 1 &&
                                <p > {usernameValidation(values.username) === true ?
                                    <span style={{ color: "blue", margin: "35%", paddingLeft: "11.5%" }}>Username is valid!</span>
                                    :
                                    <span style={{ color: "red", margin: "-6%", padding: "33%" }}>Username have to start with uppercase
                                        and have to be at least 2 characters!</span>
                                }
                                </p>
                            }

                            {/* Age */}
                            <label className={styles.htmlContent} htmlFor="age">Age:</label>
                            <input
                                type="age"
                                id={styles.username}
                                name="age"
                                placeholder="Age"
                                value={values.age}
                                onChange={changeHandler}
                                onClick={onClickUsername}
                                onBlur={onBlurUsername}
                            />
                            {/* Age */}

                            <label className={styles.htmlContent} htmlFor="pass">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id={styles.password}
                                placeholder="******"
                                value={values.password}
                                onChange={changeHandler}
                                onClick={onClickPassword}
                                onBlur={onBlurPass}
                            />
                            {pass === 1 && (values.password).length >= 1 &&
                                <p > {(values.password).length < 6 ?
                                    <span style={{ color: "red", margin: "35%", padding: "1%" }}>Password have to be at least 6 characters!</span>
                                    :
                                    <span style={{ color: "blue", margin: "35%", paddingLeft: "10%" }}>Password is valid!</span>
                                }
                                </p>
                            }

                            <label className={styles.htmlContent} htmlFor="con-pass">Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id={styles.confirmPassword}
                                placeholder="******"
                                value={values.confirmPassword}
                                onChange={changeHandler}
                                onClick={onClickConfirmPassword}
                                onBlur={onBlurRepeatPassword}
                            />
                            {repeatPass === 1 && (values.confirmPassword).length >= 1 &&
                                <>
                                    {isEqual() === true ?

                                        <p >
                                            <span style={{ color: "blue", margin: "35%", paddingLeft: "10%", paddingBottom: "10%" }}>Password match!</span>
                                        </p>
                                        :
                                        <p >
                                            <span style={{ color: "red", margin: "35%", paddingLeft: "10%", paddingBottom: "10%" }}>Password mismatch!</span>
                                        </p>
                                    }
                                </>
                            }

                            <label>
                                {checkForErrorEmail() === true &&
                                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "red", margin: "8%", paddingLeft: "11.5%" }}>Email already exist!</span>
                                }
                            </label>

                            {isFull() === true && isEqual() === true &&
                                emailValidation(values.email) === true && usernameValidation(values.username) === true ?
                                <input className={styles.submitBtn} type="submit" value="Create" style={{ marginTop: "21px" }} />
                                :
                                <input className={styles.submitDisabled} type="submit" value="Create" style={{ marginTop: "21px" }} title="You have to fill all fields!" disabled />
                            }

                        </div>


                        <p className={styles.downField}>
                            <span>If you already have profile click <Link id="fieldHere" to="/login">HERE</Link></span>
                        </p>

                    </div>
                </form>
            </section>
        </div>
    );
}