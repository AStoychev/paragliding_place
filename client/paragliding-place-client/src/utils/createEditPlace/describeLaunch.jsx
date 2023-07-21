import './createEditPlace.modules.css';

export const DescribeLaunch = ({
    values,
    changeHandler,
}) => {
    return (
        <th className="tableDiffernt">
            <label
                htmlFor="description_launch"
                className="labelDirection">
                Describe&nbsp;Launch
            </label>

            <textarea
                value={values.description_launch}
                className="textareaDirection"
                onChange={changeHandler}
                type="text"
                id="description_launch"
                name="description_launch"
                placeholder="Describe the place">
            </textarea>
        </th>
    )
}