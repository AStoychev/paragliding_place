import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalTitle from 'react-bootstrap/ModalTitle'

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

export const LoginModal = () => {
    const [show, setShow] = useState(false);

    const handleCloseLogin = () => setShow(false);
    const handleShow = () => setShow(true);

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
        <>
            {/* <Link className={styles.navLink} onClick={handleShow} to="/login">Login</Link> */}
            <Link variant="primary" onClick={handleShow} className={styles.navLink}>
                Login
            </Link>

            {/* <Button variant="primary" onClick={handleShow}>
                Login
            </Button> */}

            <Modal style={{ paddingTop: '50px' }} show={show}  onHide={handleCloseLogin}>
                <Modal.Header closeButton >
                    <Modal.Title style={{ color: 'rgb(9, 167, 56)', paddingLeft: '194px', fontSize: '28px' }}>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
                        <Form.Group className="mb-3">
                            {/* <Form.Label className={styles.htmlContent} htmlFor="username">Username</Form.Label> */}
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
                        // controlId="exampleForm.ControlTextarea1"
                        >
                            {/* <Form.Label className={styles.htmlContent} htmlFor="login-pass">Password</Form.Label> */}
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
                        {checkForErrors() === 1 ?
                            <span style={{ fontSize: "20px", fontWeight: "bold", color: "red", margin: "8%", paddingLeft: "11.5%" }}>Email or password don't match!</span>
                            :
                            <span></span>
                        }
                    </label>
                    {isFull() === true ?
                        <input type="submit" className={styles.submitBtn} value="Login" onClick={onSubmit} />
                        :
                        <input className={styles.submitDisabled} type="submit" value="Login" title="You have to fill all fields!" disabled />
                    }

                </Modal.Body>
                <Modal.Footer >
                    {/* Forget password */}
                    <p style={{ paddingBottom: "30px", paddingRight: "175px", fontSize: "17px" }}>If you forget your password <Link to="reset-password" onClick={handleCloseLogin}>Forget Password</Link> </p>
                    {/* Forget password */}
                    <p className={styles.downField}>
                        <span>If you don't have profile click <RegisterModal /></span>
                    </p>

                    {/* <Button variant="primary" onClick={onSubmit}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}