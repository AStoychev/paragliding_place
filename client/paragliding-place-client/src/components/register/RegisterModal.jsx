import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { LoginModal } from '../login/LoginModal';

import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import {
    isEqualAndHaveLength, emailValidation, usernameValidation, showIsValid, showIsInvalid, showValidUsername,
    showInvalidUsername, passwordValidMatch, passwordInvalidMatch
} from '../../validators/validators';

import styles from '../login/LoginRegister.module.css';

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
    const [checkPass, setPass] = useState("");
    const [checkRepeatPass, setRepeatPass] = useState("");

    const onClickField = (e) => {
        if (e) {
            setEmail(true);
            setUsername(true);
            setPass(true);
            setRepeatPass(true);
        };
    }

    const passwordAndConfirmPassordIsValid = isEqualAndHaveLength(values.password, values.confirmPassword);
    const emailIsValid = emailValidation(values.email);
    const usernameIsValid = usernameValidation(values.username)

    const checkAllFieldIsTrue = () => {
        if (passwordAndConfirmPassordIsValid && emailIsValid && usernameIsValid) {
            return true
        }
        return false
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
            <Link variant="primary" onClick={handleShow} className={styles.navLink}>
                Register
            </Link>


            <Modal style={{ paddingTop: '50px' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'rgb(9, 167, 56)', paddingLeft: '179px', fontSize: '28px' }}>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.htmlContent} htmlFor="email">Email:</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                id="email"
                                name="email"
                                placeholder="livingwall@gmail.com"
                                value={values.email}
                                onChange={changeHandler}
                                onClick={onClickField}
                            />
                            {checkEmai === true && (values.email).length >= 1 &&
                                <>
                                    {emailIsValid ?
                                        showIsValid("Email")
                                        :
                                        showIsInvalid("Email")
                                    }
                                </>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={styles.htmlContent} htmlFor="username">Username:</Form.Label>
                            <Form.Control
                                autoFocus
                                type="username"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={values.username}
                                onChange={changeHandler}
                                onClick={onClickField}
                            />
                            {checkUsername === true && (values.username).length >= 1 &&
                                <p >
                                    {usernameValidation(values.username) === true ?
                                        showValidUsername()
                                        :
                                        showInvalidUsername()
                                    }
                                </p>

                            }
                        </Form.Group>


                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label className={styles.htmlContent} htmlFor="register-pass">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                id="register-pass"
                                placeholder="******"
                                value={values.password}
                                onChange={changeHandler}
                                onClick={onClickField}
                            />
                            {checkPass === true && (values.password).length >= 1 &&
                                <p >
                                    {(values.password).length >= 6 ?
                                        showIsValid("Password")
                                        :
                                        showIsInvalid("Password")
                                    }
                                </p>
                            }
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label className={styles.htmlContent} htmlFor="confirm-pass">Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                id="confirm-pass"
                                placeholder="******"
                                value={values.confirmPassword}
                                onChange={changeHandler}
                                onClick={onClickField}
                            />
                            {checkRepeatPass === true && (values.confirmPassword).length >= 1 &&
                                <>
                                    {passwordAndConfirmPassordIsValid ?
                                        passwordValidMatch()
                                        :
                                        passwordInvalidMatch()
                                    }
                                </>
                            }
                        </Form.Group>
                    </Form>
                    <label>

                        {checkForErrorEmail() === true ?
                            <span style={{ fontSize: "20px", fontWeight: "bold", color: "red", margin: "8%", paddingLeft: "11.5%" }}>We’re sorry. This email or usesrname already exists…</span>
                            :
                            <span></span>
                        }
                    </label>
                    {checkAllFieldIsTrue() ?
                        <input type="submit" className={styles.submitBtn} value="Register" onClick={onSubmit} />
                        :
                        <input className={styles.submitDisabled} type="submit" value="Register" title="You have to fill all fields!" disabled />
                    }

                </Modal.Body>
            </Modal>
        </>
    );
}