import styles from'./createEditPlace.module.css';

export const Directions = ({
    values,
    directions,
    checkButtonDirections,
    onDirectionsChange,
}) => {

    return (
        <table className={styles.tableDirection}>
            <tbody>
                <tr>
                    {Object.entries(checkButtonDirections).map(([mainDirection, indetailDirection]) =>
                        <th className={styles.tableDirectionDifferent} key={mainDirection}>
                            {indetailDirection.map(directionDetail => (
                                <div
                                    className={styles.checkboxWrapper}
                                    key={directionDetail}>
                                    <label
                                        className={styles.divCheck}
                                        htmlFor={directionDetail}>
                                        {directionDetail.toUpperCase()}
                                        <input
                                            type="checkbox"
                                            name="direction"
                                            value={directionDetail}
                                            id={directionDetail}
                                            onChange={onDirectionsChange}
                                            checked={directions[directionDetail] || values.direction[directionDetail]}
                                        />
                                        <span
                                            className={styles.checkbox}>
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </th>
                    )}
                </tr>
            </tbody>
        </table>
    )
}