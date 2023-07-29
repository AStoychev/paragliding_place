import { Link } from "react-router-dom"
import styles from "./PasswordManagemetn.module.css"

export const FeedbackEnterMail = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.message}>Check your email for next step!
                    <img className={styles.image} src="../../../images/read.png" alt="#" />
                    <div className={styles.homeDivLink}><Link className={styles.errorLink} to="/">Home Page</Link></div>
                </div>
            </div>
        </>
    )
}