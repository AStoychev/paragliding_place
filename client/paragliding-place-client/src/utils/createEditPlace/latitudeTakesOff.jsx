import styles from './createEditPlace.module.css';

export const LatitudeTakesOff = ({
    values,
    changeHandler,
}) => {
    return (
        <th className={styles.tableDiffernt}>
            <label
                htmlFor="latitude_takes_off"
                className={styles.labelDirection}
            >
                Latitute&nbsp;Launch
            </label>
            <input
                className={styles.inputDirection}
                value={values.latitude_takes_off}
                onChange={changeHandler}
                id="latitude_takes_off"
                type="number"
                name="latitude_takes_off"
                placeholder="0.00"
            />
        </th>
    )
}