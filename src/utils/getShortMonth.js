export default function getShortMonth(dateObj) {
    const month = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    return month[dateObj.getMonth()];
}