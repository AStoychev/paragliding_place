export const findEmptyValue = (value) => {
    if (value === 1) {
        return <span style={{ fontSize: '15px', fontStyle: 'italic' }}>Not selected</span>
    }
    if (value === "No") {
        return <span style={{ fontSize: '15px', fontStyle: "italic" }}>Not selected</span>
    }
    return value
}
