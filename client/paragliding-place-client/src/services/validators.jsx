import "./validators.css"

// This validator function is use in Profile and Edit Profile
export const findEmptyValue = (value) => {
    if (value === 1) {
        return <span className="findEmptyFieldContainer">Not selected</span>
    }
    if (value === "No") {
        return <span className="findEmptyFieldContainer">Not selected</span>
    }
    return value
}
