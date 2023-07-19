// This validator function is use in RegisterModal and show valid message for Username
export const ShowValidUsername = () => {
    return <span className="showIsValid">Username is valid!</span>
};


// This validator function is use in RegisterModal and show invalid message for Username
export const ShowInvalidUsername = () => {
    return <span className="showIsInvalid">Username have to start with uppercase and have to be at least 2 characters!</span>
};


// This validator function is use in RegisterModal and ChangePassword and show password valid match message
export const PasswordValidMatch = () => {
    return <span className="showIsValid">Password match!</span>
};


// This validator function is use in RegisterModal and ChangePassword and show password mismatch message
export const PasswordInvalidMatch = () => {
    return <span className="showIsInvalid">Password mismatch!</span>
};