export default function formatMessage(date, level, category, message) {
    return `Date: ${date}, level:${level}, category:${category}, message:${JSON.stringify(message)}`;
}