export const formatDateTime = (dateTime) => {
    const splitDateTimeWithT = dateTime.split("T");
    const date = splitDateTimeWithT[0].replaceAll("-", ".");
    const time = splitDateTimeWithT[1].split(".")[0].split(":")
    const easternTimeHours = Number(time[0]) + 3
    const completeTime = `${date} ${easternTimeHours}:${time[1]}:${time[2]}`
    return completeTime
}