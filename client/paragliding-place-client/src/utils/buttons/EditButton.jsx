import styles from "./Buttons.module.css"

export const EditButton = () => {
    return (
        <input className={styles.submit} type="submit" value="Edit" />
    )
}