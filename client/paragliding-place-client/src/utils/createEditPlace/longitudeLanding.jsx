import './createEditPlace.modules.css';

export const LongituteLandind = ({
    values,
    changeHandler,
}) => {
    return (
        <th>
            <label
                htmlFor="longitude_landing"
                className="labelDirection"
            >
                Longitude&nbsp;Landing
            </label>
            <input
                className="inputDirection"
                value={values.longitude_landing}
                onChange={changeHandler}
                type="number"
                name="longitude_landing"
                id="longitude_landing"
                placeholder="0.00"
            />
        </th>
    )
}