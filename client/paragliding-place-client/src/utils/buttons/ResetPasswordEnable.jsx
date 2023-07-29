import styles from "./Buttons.module.css"

export const ResetPasswordEnable = () => {
    return (
        <input className={styles.resetPasswordEnableButton} type="submit" value="Reset Password" />
    )
}