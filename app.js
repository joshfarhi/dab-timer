const targetDurationElement = document.getElementById("duration-select");
const startButton = document.getElementById("start-button");
const stopResetButton = document.getElementById("stop-reset-button");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

let countdownInterval;
let targetDuration = 0; // Initialize target duration

function updateCountdown() {
    const currentDate = new Date().getTime();
    const timeDifference = targetDuration - currentDate;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        // Display the modal
        modal.style.display = "block";
        stopResetButton.textContent = "Reset"; // Change button text to "Reset"
    } else {
        // Calculate minutes, seconds, and milliseconds
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const milliseconds = timeDifference % 1000;

        // Update the countdown timer
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        millisecondsElement.textContent = milliseconds.toString().padStart(3, '0');
    }
}

startButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    const selectedDuration = parseInt(targetDurationElement.value);

    if (selectedDuration >= 1) {
        // For durations of 1 minute or more, set the target time in milliseconds
        targetDuration = selectedDuration * 60000;
    } else {
        // For durations less than 1 minute, set the target time in milliseconds and seconds
        targetDuration = selectedDuration * 1000;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 10); // Update every 10 milliseconds for milliseconds display
    stopResetButton.textContent = "Stop"; // Change button text to "Stop"
});

stopResetButton.addEventListener("click", () => {
    if (stopResetButton.textContent === "Stop") {
        clearInterval(countdownInterval);
        stopResetButton.textContent = "Reset"; // Change button text to "Reset"
    } else {
        targetDuration = 0; // Reset the target duration
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        millisecondsElement.textContent = "000";
        stopResetButton.textContent = "Stop"; // Change button text back to "Stop"
        modal.style.display = "none"; // Close the modal if it's open
    }
});

// Close the modal when the "x" button is clicked
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Update the countdown numbers when a time is selected from the dropdown
targetDurationElement.addEventListener("change", () => {
    const selectedDuration = parseInt(targetDurationElement.value);
    // Set the selected duration into the countdown numbers
    if (selectedDuration >= 1) {
        minutesElement.textContent = selectedDuration.toString().padStart(2, '0');
        secondsElement.textContent = "00";
        millisecondsElement.textContent = "000";
    } else {
        minutesElement.textContent = "00";
        secondsElement.textContent = selectedDuration.toString().padStart(2, '0');
        millisecondsElement.textContent = "000";
    }
});
