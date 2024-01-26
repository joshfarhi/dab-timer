const targetDurationElement = document.getElementById("duration-select");
const startButton = document.getElementById("start-button");
const stopResetButton = document.getElementById("stop-reset-button");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

let countdownInterval;
let targetDuration = 0; // Initialize target duration

// Function to update the countdown timer preview
function updateCountdownPreview() {
    const selectedDuration = parseInt(targetDurationElement.value);

    if (selectedDuration >= 1) {
        // For durations of 1 minute or more, set the preview in seconds
        document.getElementById("seconds").textContent = (selectedDuration).toString().padStart(2, '0');
    } else {
        // For durations less than 1 minute, set the preview in seconds
        document.getElementById("seconds").textContent = selectedDuration.toString().padStart(2, '0');
    }
}

function updateCountdown() {
    const currentDate = new Date().getTime();
    const timeDifference = targetDuration - currentDate;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        // Display the modal
        modal.style.display = "block";
        stopResetButton.textContent = "Reset"; // Change button text to "Reset"
    } else {
        // Calculate seconds
        const seconds = Math.floor(timeDifference / 1000);

        // Update the countdown timer
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
}

startButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    targetDuration = (parseInt(targetDurationElement.value) * 1000) + new Date().getTime(); // Set the target time
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000); // Update every second
    stopResetButton.textContent = "Stop"; // Change button text to "Stop"
});

stopResetButton.addEventListener("click", () => {
    if (stopResetButton.textContent === "Stop") {
        clearInterval(countdownInterval);
        stopResetButton.textContent = "Reset"; // Change button text to "Reset"
    } else {
        targetDuration = 0; // Reset the target duration
        document.getElementById("seconds").textContent = "00";
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

targetDurationElement.addEventListener("change", () => {
    // ... (the rest of your code remains the same)
});
