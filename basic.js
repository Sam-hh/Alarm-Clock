// Audio element for the alarm sound
const alarmSound = new Audio("sources/alarm.mp3");
alarmSound.loop = true;

// Constants for DOM elements
const setAlarmButton = document.getElementById("setAlarmButton");
const alarmsContainer = document.getElementById("alarms");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const stopButton = document.getElementById("modal-stop");
const snoozeButton = document.getElementById("modal-snooze");

// Event Listeners
setAlarmButton.addEventListener("click", setAlarm);
stopButton.addEventListener("click", stopAlarm);
snoozeButton.addEventListener("click", snoozeAlarm);

// Variables
let alarms = [];
let currentPlayingAlarmIndex = null;

// Clock
function updateClock() {}

function padZero(num) {}

// Alarm
function setAlarm() {}

function isDuplicateAlarm(hour, minute, ampm) {}

function createAlarmTime(hour, minute, ampm) {}

function renderAlarms() {}

function createDeleteButton(index) {}

function deleteAlarm(index) {}

function resetInputFields() {}

// Alarm Check
function checkAlarms() {}

function isAlarmTime(now, alarm) {}

function handleAlarm(index) {}

function showModal(index) {}

function stopAlarm() {}

function snoozeAlarm() {}

// Initialize
setInterval(updateClock, 1000); // Update the clock every second
setInterval(checkAlarms, 1000); // Check for alarms every second
updateClock(); // Initial clock update
