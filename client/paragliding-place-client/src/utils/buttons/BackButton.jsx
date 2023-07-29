import { Link } from "react-router-dom"

import styles from "./Buttons.module.css"

export const BackButton = ({
    backButtonUrl,
}) => {
    return (
        <Link className={styles.backButton} to={backButtonUrl}>Back</Link>
    )
}