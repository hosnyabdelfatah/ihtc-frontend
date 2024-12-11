const formatDateForInbox = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    // Check if the date is today
    const isToday = date.toDateString() === now.toDateString();

    // Check if the date is in the current year
    const isCurrentYear = date.getFullYear() === now.getFullYear();

    if (isToday) {
        // Format as 'hh:mm AM/PM'
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
        return `${formattedHours}:${minutes} ${ampm}`;
    } else if (isCurrentYear) {
        // Format as 'Mon DD'
        const options = {month: 'short', day: 'numeric'};
        return date.toLocaleDateString(undefined, options);
    } else {
        // Format as 'Mon DD, YYYY'
        const options = {month: 'short', day: 'numeric', year: 'numeric'};
        return date.toLocaleDateString(undefined, options);
    }
};

export default formatDateForInbox;
