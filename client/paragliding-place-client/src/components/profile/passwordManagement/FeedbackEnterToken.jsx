import { Link } from "react-router-dom"
import styles from "./PasswordManagemetn.module.css"

export const FeedbackEnterToken = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.message}>You password was changed!
                    <img className={styles.image} src="../../../images/reset-password.png" alt="#" />
                    <div className={styles.homeDivLink}><Link className={styles.homePageLink} to="/">Home Page</Link></div>
                </div>
            </div>
        </>
    )
}