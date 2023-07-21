import './createEditPlace.modules.css';

export const LongitudeTakesOff = ({
    values,
    changeHandler,
}) => {
    return (
        <th className="tableDiffernt">
            <label
                htmlFor="longitude_takes_off"
                className="labelDirection"
            >
                Longitude&nbsp;Launch
            </label>
            <input
                className="inputDirection"
                value={values.longitude_takes_off}
                onChange={changeHandler}
                type="number"
                name="longitude_takes_off"
                id="longitude_takes_off"
                placeholder="0.00"
            />
        </th>
    )
}