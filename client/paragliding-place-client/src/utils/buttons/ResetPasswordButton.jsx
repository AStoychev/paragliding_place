import styles from "./Buttons.module.css"

export const ResetPasswordButton = ({
    fetchData,
    disabled
}) => {
    return (
        <input className={styles.resetPassword} type="submit" onClick={fetchData} value="Reset Password" disabled={disabled} />
    )
}