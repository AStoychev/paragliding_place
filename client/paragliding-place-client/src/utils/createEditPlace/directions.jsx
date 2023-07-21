import './createEditPlace.modules.css';

export const Directions = ({
    values,
    directions,
    checkButtonDirections,
    onDirectionsChange,
}) => {

    return (
        <table className="tableDirection">
            <tbody>
                <tr>
                    {Object.entries(checkButtonDirections).map(([mainDirection, indetailDirection]) =>
                        <th className="tableDirectionDifferent" key={mainDirection}>
                            {indetailDirection.map(directionDetail => (
                                <div
                                    className="checkboxWrapper"
                                    key={directionDetail}>
                                    <label
                                        className="divCheck"
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
                                            className="checkbox">
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