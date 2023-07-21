import './createEditPlace.modules.css';

export const DescribeLanding = ({
    values,
    changeHandler,
}) => {
    return (
        <th>
            <label
                htmlFor="description_landing"
                className="labelDirection">
                Describe&nbsp;Landing
            </label>

            <textarea
                value={values.description_landing}
                className="textareaDirection"
                onChange={changeHandler}
                type="text"
                id="description_landing"
                name="description_landing"
                placeholder="Describe the place">
            </textarea>
        </th>
    )
}