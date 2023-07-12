import "./validators.css"

// This validator function check if user is owner
export const isOwner = (compareId, ownerId) => {
    if (compareId === ownerId) {
        return true
    }
}


// This validator function is use in Profile and EditProfile
export const findEmptyValue = (value) => {
    if (value === 1) {
        return <span className="findEmptyFieldContainer">Not selected</span>
    }
    if (value === "No") {
        return <span className="findEmptyFieldContainer">Not selected</span>
    }
    return value
};


// This validator function is use in RegisterModal and ChangePassword
export const isEqualAndHaveLength = (newValue, confirmValue) => {
    if (newValue === confirmValue && (newValue).length >= 6 && (confirmValue).length >= 6) {
        return true
    }
};



// This validator function is use in RegisterModal and check email is valid
export const emailValidation = (emailValue) => {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (emailValue.match(emailFormat)) {
        return true
    } else {
        return false
    }
}


// This validator function is use in RegisterModal and check username is valid
export const usernameValidation = (usernameValue) => {
    let usernameFormat = /[A-Z][a-z]*/

    if (usernameValue.match(usernameFormat) && usernameValue.length >= 2) {
        return true
    } else {
        return false
    }
}


// This validator function is use in RegisterModal and show valid message
export const showIsValid = (inputField) => {
    return <span className="showIsValid">{inputField} is valid!</span>
};


// This validator function is use in RegisterModal and show invalid message
export const showIsInvalid = (inputField) => {
    return <span className="showIsInvalid">{inputField} is not valid!</span>
};


// This validator function is use in RegisterModal and show valid message for Username
export const showValidUsername = () => {
    return <span className="showIsValid">Username is valid!</span>
};


// This validator function is use in RegisterModal and show invalid message for Username
export const showInvalidUsername = () => {
    return <span className="showIsInvalid">Username have to start with uppercase and have to be at least 2 characters!</span>
};


// This validator function is use in RegisterModal and ChangePassword and show valid match message
export const passwordValidMatch = () => {
    return <span className="showIsValid">Password match!</span>
};


// This validator function is use in RegisterModal and ChangePassword and show valid inmatch message
export const passwordInvalidMatch = () => {
    return <span className="showIsInvalid">Password mismatch!</span>
};