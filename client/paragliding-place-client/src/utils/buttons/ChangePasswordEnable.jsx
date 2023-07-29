import styles from "./Buttons.module.css"

export const ChangePasswordEnable = () => {
    return (
        <input className={styles.changePasswordEnable} type="submit" title="Change Password" value="Change" />
    )
}