export default function formatMessage(date, level, category, message) {
    return `"${Date.now()}","${level}","${category}","${JSON.stringify(message)}"`;
}