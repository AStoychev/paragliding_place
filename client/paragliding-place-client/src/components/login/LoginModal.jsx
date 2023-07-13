import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { RegisterModal } from '../register/RegisterModal';

import { Link } from 'react-router-dom';

import styles from './LoginRegister.module.css';

const LoginFormKeys = {
    Username: 'username',
    // Email: 'email',
    Password: 'password',
}

export const LoginModal = ({ navigatePath }) => {
    const [show, setShow] = useState(false);

    if (navigatePath === undefined) {
        navigatePath = "/"
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { onLoginSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Username]: '',
        // [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
        "path": navigatePath,

    }, onLoginSubmit);

    const checkAllFieldIsFull = !Object.values(values).includes("")

    const { thisError } = useAuthContext()

    const checkForErrors = () => {
        if (Object.values(thisError).length > 0) {
            return true
        }
    }

    return (
        <>
            <Link variant="primary" onClick={handleShow} className={styles.navLink}>
                Login
            </Link>

            <Modal style={{ paddingTop: '50px' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title style={{ color: 'rgb(9, 167, 56)', paddingLeft: '194px', fontSize: '28px' }}>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.htmlContent}>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="username"
                                id={styles.username}
                                placeholder="Username"
                                name={LoginFormKeys.Username}
                                value={values[LoginFormKeys.Username]}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label className={styles.htmlContent}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="login-password"
                                placeholder="******"
                                name={LoginFormKeys.Password}
                                value={values[LoginFormKeys.Password]}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Form>
                    <label>
                        {checkForErrors() ?
                            <span style={{ fontSize: "20px", fontWeight: "bold", color: "red", margin: "8%", paddingLeft: "11.5%" }}>Email or password don't match!</span>
                            :
                            <span></span>
                        }
                    </label>
                    {checkAllFieldIsFull ?
                        <input type="submit" className={styles.submitBtn} value="Login" onClick={onSubmit} />
                        :
                        <input className={styles.submitDisabled} type="submit" value="Login" title="You have to fill all fields!" disabled />
                    }

                </Modal.Body>
                <Modal.Footer >
                    {/* Reset password */}
                    <p style={{ paddingBottom: "30px", paddingRight: "175px", fontSize: "17px" }}>If you forget your password <Link to="reset-password" onClick={handleClose}>Forget Password</Link> </p>
                    {/* Reset password */}

                </Modal.Footer>
            </Modal>
        </>
    );
}