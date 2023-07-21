import './createEditPlace.modules.css';

export const NamePlace = ({
    values,
    changeHandler,
}) => {
    return (
        <>
            <label className="placeLabel" htmlFor="place">Place Name</label>
            <input
                value={values.place}
                className="inputName"
                onChange={changeHandler}
                id="place"
                type="text"
                name="place"
                placeholder="Write name"
            />
        </>
    )
}