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
    return false
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


// This function return percentage use in PlaceDetails
export const inPercentage = (rate, allPeople) => {
    let result = (rate / allPeople) * 100
    return Math.round(result)
}


// This validator function is use in RegisterModal and show valid message
export const showIsValid = (inputField) => {
    return <span className="showIsValid">{inputField} is valid!</span>
};


// This validator function is use in RegisterModal and show invalid message
export const showIsInvalid = (inputField) => {
    return <span className="showIsInvalid">{inputField} is not valid!</span>
};

// This validator function is use in Create place and Edit Place and check for length in palace name
// Not use at the moment
export const placeNameValidator = (name) => {
    if(name.length <= 30) {
        console.log("valid")
        return <span className="showIsValid">Name is valid</span>
    }
    console.log("Invalid")
    return <span className="showIsInvalid">Name is not valid</span>
}