import http from "../http";

export function timeAgo(dateString) { // This function takes the take string in dd/mm/yyyy format
    const now = Date.now();
    const parts = dateString.split("/");
    const date = `${parts[1]}-${parts[0]}-${parts[2]}`;
    const difference = now - new Date(date).getTime();  //to get accurate time in the date string should be in mm-dd-yyyy format & this will give the time in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let timeAgoString;
    if (hours < 24) {
        timeAgoString = "Posted Today";
    } else if (days < 30) {
        timeAgoString = days + " day" + (days > 1 ? "s" : "") + " ago";
    } else if (months < 12) {
        timeAgoString = months + " month" + (months > 1 ? "s" : "") + " ago";
    } else {
        timeAgoString = years + " year" + (years > 1 ? "s" : "") + " ago";
    }

    return timeAgoString;
}

export function timeAgoMinutes(date) {
    const now = Date.now();
    const difference = now - new Date(date).getTime();  //to get accurate time in the date string should be in mm-dd-yyyy format & this will give the time in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let timeAgoString;
    if (seconds < 60) {
        timeAgoString = seconds + "s" + " ago";
    } else if (minutes < 60) {
        timeAgoString = minutes + "m" + " ago";
    } else if (hours < 24) {
        timeAgoString = hours + "h" + " ago";
    } else if (days < 30) {
        timeAgoString = days + "d" + " ago";
    } else if (months < 12) {
        timeAgoString = months + "m" + " ago";
    } else {
        timeAgoString = years + "y" + " ago";
    }

    return timeAgoString;
}

export function getTrueKeys(obj) {
    // Use Object.keys() to get all keys as an array
    const keys = Object.keys(obj);

    // Filter the keys using Array.filter() and a condition
    const truekeys = keys.filter(key => obj[key] === true);

    // This is because in benefits there is an others option with a text box
    if (truekeys.includes("Others")) {
        truekeys.splice(truekeys.indexOf("Others"), 1)
        truekeys.push(obj.OthersText)
    }
    return truekeys.join(" ")
}


export const getCloseDate = (date) => {
    let closedate = new Date(date)
    closedate.setMonth(closedate.getMonth() + 1)
    return closedate.toISOString().slice(0, 10)
}

export function getYoutubeVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
}

export function getUserID() {
    return localStorage.getItem('user_id')
}

export const tryCatch = async (request) => {
    try {
        const response = await request()
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}