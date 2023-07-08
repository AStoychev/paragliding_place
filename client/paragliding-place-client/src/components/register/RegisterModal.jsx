import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalTitle from 'react-bootstrap/ModalTitle'

import { LoginModal } from '../login/LoginModal';

import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import { isEqualAndHaveLength } from '../../validators/validators';

import styles from '../login/LoginRegister.module.css';

const LoginFormKeys = {
    Username: 'username',
    // Email: 'email',
    Password: 'password',
}

export const RegisterModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        username: '',
        // age: '',
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
        <>
            {/* <Link className={styles.navLink} onClick={handleShow} to="/login">Login</Link> */}
            <Link variant="primary" onClick={handleShow} className={styles.navLink}>
                Register
            </Link>

            {/* <Button variant="primary" onClick={handleShow}>
                Login
            </Button> */}

            <Modal style={{ paddingTop: '50px' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'rgb(9, 167, 56)', paddingLeft: '179px', fontSize: '28px' }}>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.htmlContent} htmlFor="email">Email:</Form.Label>
                            <Form.Control
                                autoFocus
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
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">  */}
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.htmlContent} htmlFor="username">Username:</Form.Label>
                            <Form.Control
                                autoFocus
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
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            // controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label className={styles.htmlContent} htmlFor="login-pass">Password:</Form.Label>
                            <Form.Control
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
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            // controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label className={styles.htmlContent} htmlFor="login-pass">Confirm Password:</Form.Label>
                            <Form.Control
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
                                    {isEqualAndHaveLength(values.password, values.confirmPassword) === true ?

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
                        </Form.Group>
                    </Form>
                    <label>
                        {checkForErrorEmail() === 1 ?
                            <span style={{ fontSize: "20px", fontWeight: "bold", color: "red", margin: "8%", paddingLeft: "11.5%" }}>Email or password don't match!</span>
                            :
                            <span></span>
                        }
                    </label>
                    {isFull() === true ?
                        <input type="submit" className={styles.submitBtn} value="Register" onClick={onSubmit} />
                        :
                        <input className={styles.submitDisabled} type="submit" value="Register" title="You have to fill all fields!" disabled />
                    }

                </Modal.Body>
                <Modal.Footer>
                    <p className={styles.downField}>
                        <span>If you already have profile click <LoginModal /></span>
                    </p>

                    {/* <Button variant="primary" onClick={onSubmit}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}