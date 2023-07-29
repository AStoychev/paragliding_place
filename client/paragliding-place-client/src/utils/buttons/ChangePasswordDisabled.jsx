import styles from "./Buttons.module.css"

export const ChangePasswordDisabled = () => {
    return (
        <input className={styles.changePasswordDisable} type="submit" title="Fill all fields" value="Change" disabled={true} />
    )
}