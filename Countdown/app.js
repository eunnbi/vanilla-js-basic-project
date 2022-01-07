const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const giveAway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// set future date
const futureDate = new Date(2022, 4, 30, 8, 0, 0);
function setGiveAway(){
    const weekDay = weekdays[futureDate.getDay()];
    const day = futureDate.getDate();
    const month = months[futureDate.getMonth()];
    const year = futureDate.getFullYear();
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes().toString(10).padStart(2, '0');
  
    giveAway.innerText = `giveaway ends on ${weekDay}, ${day} ${month} ${year}, ${hours}:${minutes}am`;
}
setGiveAway();



function getRemainingTime(){
    // time in ms
    const future = futureDate.getTime();
    const today = new Date().getTime();
    const remainingTime = future - today;
    // 1sec = 1000ms
    // 1min = 60sec
    // 1hour = 60min
    // 1day = 24hours

    if (remainingTime < 0){
        clearInterval(countDown);
        deadline.innerHTML = `<h4 class ="expire">sorry, this giveaway has expired</h4>`;
    }

    // values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(remainingTime / oneDay);
    let hours = Math.floor((remainingTime % oneDay) / oneHour);
    let minutes = Math.floor((remainingTime % oneHour) / oneMinute);
    let seconds = Math.floor((remainingTime % oneMinute) / 1000);

    const values = [days, hours, minutes, seconds];
    items.forEach(function(item, index){
        item.innerText = values[index].toString(10).padStart(2, "0");
    })
}

let countDown = setInterval(getRemainingTime, 1000);
getRemainingTime();