import styles from './createEditPlace.module.css';

export const DescribeLaunch = ({
    values,
    changeHandler,
}) => {
    return (
        <th className={styles.tableDifferent}>
            <label
                htmlFor="description_launch"
                className={styles.labelDirection}>
                Describe&nbsp;Launch
            </label>

            <textarea
                value={values.description_launch}
                className={styles.textareaDirection}
                onChange={changeHandler}
                type="text"
                id="description_launch"
                name="description_launch"
                placeholder="Describe the launch place">
            </textarea>
        </th>
    )
}