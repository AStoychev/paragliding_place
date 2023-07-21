import './createEditPlace.modules.css';

export const LatitudeLanding = ({
    values,
    changeHandler,
}) => {
    return (
        <th>
            <label
                htmlFor="latitude_landing"
                className="labelDirection"
            >
                Latitute&nbsp;Landing
            </label>
            <input
                value={values.latitude_landing}
                className="inputDirection"
                onChange={changeHandler}
                id="latitude_landing"
                type="number"
                name="latitude_landing"
                placeholder="0.00"
            />
        </th>
    )
}