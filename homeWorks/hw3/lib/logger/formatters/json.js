export default function formatMessage(date, level, category, message) {
    // return {date, level, category, message}
    return JSON.stringify({date, level, category, message})
}