import styles from './createEditPlace.module.css';

export const NamePlace = ({
    values,
    changeHandler,
}) => {

    return (
        <>
            <label className={styles.placeLabel} htmlFor="place">Place Name</label>
            <input
                value={values.place}
                className={styles.inputName}
                onChange={changeHandler}
                id="place"
                type="text"
                name="place"
                placeholder="Write name"
            />
        </>
    )
}