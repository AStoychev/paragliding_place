import styles from "./Buttons.module.css"

export const ResetPassowrdDisabled = () => {
    return (
        <input className={styles.reserPasswordDisabledButton} type="submit" value="Reset Password" title="You have to fill all fields" disabled />
    )
}