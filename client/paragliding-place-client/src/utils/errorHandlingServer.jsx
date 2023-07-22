export const catchServerError = (catchError, message) => {
    let showMessage = ""
    if (catchError) {
        showMessage = message
        setTimeout(() => {
            showMessage = ""
        }, 2500);
    }
    return showMessage
}



// export const catchServerError = (errors, setErrors, catchError, message) => {
//     if (catchError) {
//         setErrors(message)
//         setTimeout(() => {
//             setErrors("");
//         }, 2500);
//         return errors
//     }
// }