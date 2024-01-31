const targetDurationElement = document.getElementById("duration-select");
const startButton = document.getElementById("start-button");
const stopResetButton = document.getElementById("stop-reset-button");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

let countdownInterval;
let targetDuration = 0; // Initialize target duration
let spacebarAction = 0; // 0: Start, 1: Stop, 2: Reset
let spacebarPressCount = 0; // Count of spacebar presses

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

        // Change the background color to pastel green
        document.body.style.backgroundColor = "#98FB98"; // You can use any pastel green color code
        
        // Display the modal
        modal.style.display = "block";
        stopResetButton.textContent = "Reset"; // Change button text to "Reset"
        spacebarAction = 2; // Set spacebar action to Reset
    } else {
        // Calculate seconds
        const seconds = Math.floor(timeDifference / 1000);

        // Update the countdown timer
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
}

startButton.addEventListener("click", () => {
    startCountdown();
});

function startCountdown() {
    clearInterval(countdownInterval);
    targetDuration = (parseInt(targetDurationElement.value) * 1000) + new Date().getTime(); // Set the target time
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000); // Update every second
    stopResetButton.textContent = "Stop"; // Change button text to "Stop"
    spacebarAction = 1; // Set spacebar action to Stop
}

stopResetButton.addEventListener("click", () => {
    if (stopResetButton.textContent === "Stop") {
        stopCountdown();
    } else {
        resetCountdown();
    }
});

function stopCountdown() {
    clearInterval(countdownInterval);
    stopResetButton.textContent = "Reset"; // Change button text to "Reset"
    spacebarAction = 2; // Set spacebar action to Reset
}

function resetCountdown() {
    targetDuration = 0; // Reset the target duration
    document.getElementById("seconds").textContent = "00";
    stopResetButton.textContent = "Stop"; // Change button text back to "Stop"
    modal.style.display = "none"; // Close the modal if it's open
    spacebarAction = 0; // Set spacebar action to Start
}

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
    updateCountdownPreview();
});

// Event listener for spacebar key press
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (spacebarAction === 0) {
            startCountdown();
            spacebarPressCount++;
        } else if (spacebarAction === 1) {
            stopCountdown();
            spacebarPressCount++;
        } else if (spacebarAction === 2 && spacebarPressCount >= 2) {
            resetCountdown();
            spacebarPressCount = 0;
        }
    }
});
