import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import React from 'react';
import styles from './LoginRegister.module.css';

import { Link } from 'react-router-dom';

const LoginFormKeys = {
    Username: 'username',
    // Email: 'email',
    Password: 'password',
};

export const Logins = () => {
    const { onLoginSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Username]: '',
        // [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',

    }, onLoginSubmit);

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

    const { thisError } = useAuthContext()

    let count = 0

    const checkForErrors = () => {
        if (Object.values(thisError).length > 0) {
            count = 1
            return count
        } 
    }

    return (
        <div className={styles.container}>
            <section id={styles.loginPage} className={styles.auth}>
                <form id={styles.login} method='POST' onSubmit={onSubmit} >

                    <div style={{ color: "red" }} className={styles.container}>
                        <h1 className={styles.header}>Login</h1>
                        
                        <label className={styles.htmlContent} htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id={styles.username}
                            placeholder="livingwall@gmail.com"
                            name={LoginFormKeys.Username}
                            value={values[LoginFormKeys.Username]}
                            onChange={changeHandler}
                        />

                        <label className={styles.htmlContent} htmlFor="login-pass">Password:</label>
                        <input
                            type="password"
                            id="login-password"
                            placeholder="******"
                            name={LoginFormKeys.Password}
                            value={values[LoginFormKeys.Password]}
                            onChange={changeHandler}

                        />
                        <label>
                            {checkForErrors() === 1 ?
                                <span style={{ fontSize: "20px", fontWeight: "bold", color: "red", margin: "8%", paddingLeft: "11.5%" }}>Email or password don't match!</span>
                                :
                                <span></span>
                            }
                        </label>

                        {isFull() === true ?
                            <input type="submit" className={styles.submitBtn} value="Login"/>
                            :
                            <input className={styles.submitDisabled} type="submit" value="Login" title="You have to fill all fields!" disabled />
                        }

                        <p className={styles.downField}>
                            <span>If you don't have profile click <Link id="fieldHere" to="/register">HERE</Link></span>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
}