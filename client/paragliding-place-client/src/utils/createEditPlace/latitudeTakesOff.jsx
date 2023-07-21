import './createEditPlace.modules.css';

export const LatitudeTakesOff = ({
    values,
    changeHandler,
}) => {
    return (
        <th className="tableDiffernt">
            <label
                htmlFor="latitude_takes_off"
                className="labelDirection"
            >
                Latitute&nbsp;Launch
            </label>
            <input
                value={values.latitude_takes_off}
                className="inputDirection"
                onChange={changeHandler}
                id="latitude_takes_off"
                type="number"
                name="latitude_takes_off"
                placeholder="0.00"
            />
        </th>
    )
}