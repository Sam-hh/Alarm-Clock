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
function updateClock() {
  const now = new Date();
  const hours = padZero(now.getHours() % 12 || 12);
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());
  const period = now.getHours() >= 12 ? "PM" : "AM";
  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

// Alarm
function setAlarm() {
  // Get the selected hour, minute, and period
  const hour = parseInt(document.getElementById("hour").value);
  const minute = parseInt(document.getElementById("minute").value);
  const ampm = document.getElementById("ampm").value;

  // Check for valid time input
  if (!isValidTime(hour, minute)) {
    alert("Please enter a valid time frame");
    resetInputFields(); //resets input field
    return;
  }

  // Check for duplicate alarms
  if (isDuplicateAlarm(hour, minute, ampm)) {
    alert("Alarm already exists for the selected time.");
    resetInputFields(); // resets input field
    return;
  }

  // Create a new alarm time and add it to the alarms array
  const alarmTime = createAlarmTime(hour, minute, ampm);
  alarms.push(alarmTime);
  renderAlarms(); // Render updated alarm list
  resetInputFields(); // Reset input fields after setting the alarm
}

function isValidTime(hour, minute) {
  return hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59;
}

function isDuplicateAlarm(hour, minute, ampm) {
  // Create a Date object for the selected time
  const selectedTime = new Date();
  selectedTime.setHours(hour + (ampm === "PM" && hour !== 12 ? 12 : 0));
  selectedTime.setMinutes(minute);
  selectedTime.setSeconds(0);
  selectedTime.setMilliseconds(0);

  // Check if any existing alarm matches the selected time
  return alarms.some((alarm) => {
    const alarmTime = new Date(alarm);
    return (
      alarmTime.getHours() === selectedTime.getHours() &&
      alarmTime.getMinutes() === selectedTime.getMinutes()
    );
  });
}

function createAlarmTime(hour, minute, ampm) {
  const alarmTime = new Date();
  alarmTime.setHours(hour + (ampm === "PM" && hour !== 12 ? 12 : 0));
  alarmTime.setMinutes(minute);
  alarmTime.setSeconds(0);
  alarmTime.setMilliseconds(0);
  return alarmTime;
}

function renderAlarms() {
  // Clear the alarms container before rendering the alarms
  alarmsContainer.innerHTML = "<h2>Alarms List</h2>";

  // Render each alarm in the alarms array
  alarms.forEach((alarm, index) => {
    const alarmItem = document.createElement("div");
    const hours = padZero(alarm.getHours() % 12 || 12);
    const minutes = padZero(alarm.getMinutes());
    const period = alarm.getHours() >= 12 ? "PM" : "AM";
    alarmItem.textContent = `Alarm ${index + 1}: ${hours}:${minutes} ${period}`;
    const deleteButton = createDeleteButton(index);
    alarmItem.appendChild(deleteButton);
    alarmsContainer.appendChild(alarmItem);
  });
}

function createDeleteButton(index) {
  // Create a delete button for the specified alarm index
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteAlarm(index));
  return deleteButton;
}

function deleteAlarm(index) {
  // Remove the alarm at the specified index from the alarms array
  alarms.splice(index, 1);
  renderAlarms(); // Render the updated alarm list
}

function resetInputFields() {
  // clears input fields
  document.getElementById("hour").value = "";
  document.getElementById("minute").value = "";
}

// Alarm Check
function checkAlarms() {
  const now = new Date();
  alarms.forEach((alarm, index) => {
    if (isAlarmTime(now, alarm)) {
      handleAlarm(index); // Handle the alarm if it's time to trigger
    }
  });
}

function isAlarmTime(now, alarm) {
  // Check if the current time matches the specified alarm time
  return (
    now.getHours() === alarm.getHours() &&
    now.getMinutes() === alarm.getMinutes()
  );
}

function handleAlarm(index) {
  // Trigger the alarm sound and show the modal
  currentPlayingAlarmIndex = index;
  alarmSound.play();
  showModal(index);
}

function showModal(index) {
  // Display the modal with options to stop or snooze the alarm
  modal.style.display = "block";
  modalMessage.textContent = `Alarm ${
    index + 1
  }: is going off! Do you want to stop or snooze by 5 minutes?`;
}

function stopAlarm() {
  // Stop the alarm sound and remove the alarm from the list
  if (currentPlayingAlarmIndex !== null) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    deleteAlarm(currentPlayingAlarmIndex);
    currentPlayingAlarmIndex = null;
    modal.style.display = "none";
  }
}

function snoozeAlarm() {
  // Snooze the alarm by 5 minutes and update the alarm time
  if (currentPlayingAlarmIndex !== null) {
    alarmSound.pause();
    const newAlarmTime = new Date();
    newAlarmTime.setMinutes(newAlarmTime.getMinutes() + 5);
    alarms[currentPlayingAlarmIndex] = newAlarmTime;
    renderAlarms(); // Render the updated alarm list
    currentPlayingAlarmIndex = null;
    modal.style.display = "none";
  }
}

// Initialize
setInterval(updateClock, 1000); // Update the clock every second
setInterval(checkAlarms, 1000); // Check for alarms every second
updateClock(); // Initial clock update
