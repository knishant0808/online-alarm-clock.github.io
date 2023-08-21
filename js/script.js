// Get the elements from the HTML document
const alarmForm = document.getElementById("alarm-form");
const hourInput = document.getElementById("hour");
const minutesInput = document.getElementById("minutes");
const meridiemSelect = document.getElementById("meridiem");
const alarmList = document.getElementById("alarm-list");
const currentTime = document.querySelector(".current-time");

// Create an array to store the alarms
let alarms = [];

// Create a function to format the time in 12-hour format
function formatTime(hour, minutes, meridiem) {
    // Add leading zero to minutes if less than 10
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    // Return the formatted time string
    return hour + ":" + minutes + " " + meridiem;
}

// Create a function to update the current time display
function updateTime() {
    // Get the current date and time
    let now = new Date();
    // Get the current hour, minutes and seconds
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // Convert the hour to 12-hour format and get the meridiem
    let meridiem = "AM";
    if (hour > 12) {
        hour -= 12;
        meridiem = "PM";
    } else if (hour == 0) {
        hour = 12;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    // Format the current time and display it
    currentTime.textContent = hour + ":" + minutes + ":" +  seconds + " " + meridiem;
}

// Create a function to check if any alarm matches the current time
function checkAlarm() {
    // Get the current date and time
    let now = new Date();
    // Get the current hour, minutes and meridiem
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let meridiem = "AM";
    if (hour > 12) {
        hour -= 12;
        meridiem = "PM";
    } else if (hour == 0) {
        hour = 12;
    }
    // Loop through the alarms array
    for (let i = 0; i < alarms.length; i++) {
        // Get the alarm object at index i
        let alarm = alarms[i];
        // Compare the alarm time with the current time
        if (alarm.hour == hour && alarm.minutes == minutes && alarm.meridiem == meridiem) {
            // If they match, alert the user and remove the alarm from the array
            alert("Alarm: " + formatTime(alarm.hour, alarm.minutes, alarm.meridiem));
            alarms.splice(i, 1);
            // Update the alarm list display
            displayAlarms();
            break;
        }
    }
}

// Create a function to display the alarms in the alarm list
function displayAlarms() {
    // Clear the previous content of the alarm list
    alarmList.innerHTML = "";
    // Loop through the alarms array
    for (let i = 0; i < alarms.length; i++) {
        // Get the alarm object at index i
        let alarm = alarms[i];
        // Create a list item element for the alarm
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = formatTime(alarm.hour, alarm.minutes, alarm.meridiem);
        // Create a button element to delete the alarm
        let btn = document.createElement("button");
        btn.className = "btn btn-danger";
        btn.textContent = "Delete";
        btn.addEventListener("click", function() {
            // Remove the alarm from the array when clicked
            alarms.splice(i, 1);
            // Update the alarm list display
            displayAlarms();
        });
        // Append the button to the list item
        li.appendChild(btn);
        // Append the list item to the alarm list
        alarmList.appendChild(li);
    }
}

// Add an event listener to the alarm form submit event
alarmForm.addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the values from the input elements
    let hour = parseInt(hourInput.value);
    let minutes = parseInt(minutesInput.value);
    let meridiem = meridiemSelect.value;
    // Validate the input values
    if (isNaN(hour) || isNaN(minutes) || hour < 1 || hour > 12 || minutes < 0 || minutes > 59) {
        alert("Please enter a valid time.");
        return;
    }
    // Create an object to store the alarm data
    let alarm = {
        hour: hour,
        minutes: minutes,
        meridiem: meridiem
    };
    // Add the alarm object to the alarms array
    alarms.push(alarm);
    // Update the alarm list display
    displayAlarms();
    // Reset the form input values
    alarmForm.reset();
});

// Call the updateTime function every second
setInterval(updateTime, 1000);

// Call the checkAlarm function every minute
setInterval(checkAlarm, 1000);
