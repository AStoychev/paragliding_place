import "./validators.css"


// This validator function is use in Profile and EditProfile
export const findEmptyValue = (value) => {
    if (value === 1) {
        return <span className="findEmptyFieldContainer">Not selected</span>
    }
    if (value === "No") {
        return <span className="findEmptyFieldContainer">Not selected</span>
    }
    return value
}


// This validator function is use in RegisterModal and ChangePassword
export const isEqualAndHaveLength = (newValue, confirmValue) => {
    if (newValue === confirmValue && (newValue).length >= 6 && (confirmValue).length >= 6) {
        return true
    }
}