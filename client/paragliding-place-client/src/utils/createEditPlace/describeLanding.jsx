import styles from './createEditPlace.module.css';

export const DescribeLanding = ({
    values,
    changeHandler,
}) => {
    return (
        <th className={styles.tableDifferent}>
            <label
                htmlFor="description_landing"
                className={styles.labelDirection}>
                Describe&nbsp;Landing
            </label>

            <textarea
                value={values.description_landing}
                className={styles.textareaDirection}
                onChange={changeHandler}
                type="text"
                id="description_landing"
                name="description_landing"
                placeholder="Describe the landing place">
            </textarea>
        </th>
    )
}