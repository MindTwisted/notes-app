export default function addZeroBefore(str) {
    return String(str).length < 2 ? `0${str}` : str;
}