const targetDurationElement = document.getElementById("duration-select");
const startButton = document.getElementById("start-button");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

let countdownInterval;
let targetDuration = 0; // Initialize target duration

function updateCountdown() {
    const currentDate = new Date().getTime();
    const timeDifference = targetDuration - currentDate;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        // Display the modal
        modal.style.display = "block";
    } else {
        // Calculate minutes, seconds, and milliseconds
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const milliseconds = timeDifference % 1000;

        // Update the countdown timer
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(3, '0');
    }
}

startButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    targetDuration = (parseInt(targetDurationElement.value) * 1000) + new Date().getTime(); // Set the target time
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 10); // Update every 10 milliseconds for milliseconds display
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
