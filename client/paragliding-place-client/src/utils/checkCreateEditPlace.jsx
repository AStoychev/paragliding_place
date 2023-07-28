// This function is for find empty field in Create/Edit Place. In main function have other two function, one check fields place, latitude_takes_off, 
// longitude_takes_off, latitude_landing, longitude_landing, description_launch, description_landing, difficulty_level. Other check only field direction.

export const checkCreateEditPlace = (values) => {
    // This function will return false when all field from values without direction are different from empty string or number
    const checkForEmptyValues = (check) => {
        return check === ""
    }

    // Check if some values direction is checked
    const directionIsCheck = (check) => {
        return check === true
    }

    let otherFieldIsFull = Object.entries(values).slice(1, 9).map(entry => entry[1]).some(checkForEmptyValues)
    let directionIsFull = Object.values(values.direction).some(directionIsCheck);
    if (!otherFieldIsFull && directionIsFull) {
        return true
    }
    return false

}