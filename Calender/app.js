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
    'December'
  ];
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const calender = document.querySelector(".calender__content");
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth =  today.getMonth();
const todayDate = today.getDate();
let year = today.getFullYear();
let month = today.getMonth();
let firstDate;
let lastDate;
let firstDay;

function init(year, month){
    // delete row except weekday row
    const rowLength = calender.rows.length;
    for (let i = 0; i < rowLength - 1; i++){
        calender.deleteRow(-1);
    }
    // set calender title
    const monthYear = document.querySelector(".month-year");
    monthYear.innerText = `${months[month]} ${year}`;
    // set firstDate, lastDate, firstDay
    firstDate = new Date(year, month, 1).getDate();
    lastDate = new Date(year, month + 1, 0).getDate();
    firstDay = new Date(year, month, 1).getDay();
}


function makeCalender(year, month){
    init(year, month);
    row = calender.insertRow();
    // 1일 전까지 공란 만들기
    for (let day = 0; day < firstDay; day++){
        cell = row.insertCell();
    }
    // 달력 만들기
    for (let day = firstDate; day <= lastDate; day++){
        if (firstDay == 6){
            cell = row.insertCell();
            cell.innerText = `${day}`;
            firstDay = firstDay - 6;
            row = calender.insertRow();
        }
        else{
            cell = row.insertCell();
            cell.innerText = `${day}`;
            firstDay++;
        }
        if (day === todayDate && year === todayYear && month === todayMonth){
            cell.className = "today";
        }
    }
}

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
prevBtn.addEventListener("click", function(){
    month--;
    if (month === -1){
        year = year - 1;
        month = month + 12;
    }
    makeCalender(year, month);

});

nextBtn.addEventListener("click", function(){
    month++;
    if (month === 12){
        year = year + 1;
        month = month - 12;
    }
    makeCalender(year, month);
})
makeCalender(year, month);
