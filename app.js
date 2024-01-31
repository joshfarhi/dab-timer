const targetDurationElement = document.getElementById("duration-select");
const startButton = document.getElementById("start-button");
const stopResetButton = document.getElementById("stop-reset-button");
const modal = document.getElementById("myModal");
const overlay = document.getElementById("overlay");
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

        // Show the modal and overlay
        showModalRelativeToTimer();

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
    hideModal(); // Hide the modal and overlay
    spacebarAction = 0; // Set spacebar action to Start

    // Change the background color back to its original color
    document.body.style.backgroundColor = "#0d1b2a"; // Replace with your original background color
}

// Close the modal when the "x" button is clicked
closeBtn.addEventListener("click", () => {
    hideModal();
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target == overlay) {
        hideModal();
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

// Function to show the modal and overlay relative to the timer container
function showModalRelativeToTimer() {
    const timerContainer = document.querySelector(".timer-container");
    const timerRect = timerContainer.getBoundingClientRect();

    // Calculate the position of the modal relative to the timer container
    const modalTop = timerRect.top + timerRect.height / 2;
    const modalLeft = timerRect.left + timerRect.width / 2;

    modal.style.top = `${modalTop}px`;
    modal.style.left = `${modalLeft}px`;

    modal.style.display = "block";
    overlay.style.display = "block";
}

// Function to hide the modal and overlay
function hideModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
}

// Update the count displayed on the page
function updateCount() {
    countElement.textContent = count;
}

// Increment the count when the "Dab" button is clicked
incrementButton.addEventListener("click", () => {
    count++;
    updateCount();
});

// Reset the count to zero when the "Reset" button is clicked
resetButton.addEventListener("click", () => {
    count = 0;
    updateCount();
});

// Initial count update for the Dab Counter
updateCount();
