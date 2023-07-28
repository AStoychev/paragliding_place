// Change color to from black to red when textarea limit is reach
export const limitColor = (text) => {
    let limitColor = "black"
    if (text.length === 500) {
        limitColor = "red"
    }
    return limitColor
}