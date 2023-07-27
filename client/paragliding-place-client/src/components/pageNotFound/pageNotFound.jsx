import { Link } from "react-router-dom"

import styles from "./PageNotFound.module.css"

export const PageNotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.errorMessage}>Ooops! Sorry 404 Page Not Found!
                <img className={styles.errorImage} src="images/parachute.png" alt="#" />
                <div className={styles.errorDivLink}><Link className={styles.errorLink} to="/">Home Page</Link></div>
            </div>
        </div>
    )
}