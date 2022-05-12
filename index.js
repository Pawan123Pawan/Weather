const setWheather = document.getElementById('wheather');
const setDate = document.getElementById("date");

const temStatus = "clouds";

const getCurrentDay = () => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let currentTime = new Date();
    let day = (weekday[currentTime.getDay()]);
    return day;
};
const getCurrentTime = () => {
    let currentTimes = new Date();
    let months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Nov", "Des"];
    let manth = months[currentTimes.getMonth() + 1];
    let day = currentTimes.getDate();
    let fullYear = currentTimes.getFullYear();

    let hours = currentTimes.getHours();
    let min = currentTimes.getMinutes();
    let period = "AM";
    if (hours > 11) {
        period = "PM"
        if (hours > 12) { hours -= 12 };
    };
    if (min < 10) {
        min = "0" + min;
    }
    return `${day}:${manth}:${fullYear} | ${hours}:${min}:${period}`

}
setDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();



