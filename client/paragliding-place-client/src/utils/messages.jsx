// This validator function is use in RegisterModal and show valid message for Username
export const ShowValidUsername = () => {
    return <p className="showIsValid">Username is valid!</p>
};


// This validator function is use in RegisterModal and show invalid message for Username
export const ShowInvalidUsername = () => {
    return <p className="showIsInvalid">Username have to start with uppercase and have to be at least 2 characters!</p>
};


// This validator function is use in RegisterModal and ChangePassword and show password valid match message
export const PasswordValidMatch = () => {
    return <p className="showIsValid">Password match!</p>
};


// This validator function is use in RegisterModal and ChangePassword and show password mismatch message
export const PasswordInvalidMatch = () => {
    return <p className="showIsInvalid">Password mismatch!</p>
};