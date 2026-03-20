let timeLeft = 4;
const countdownDisplay = document.getElementById('countdown-display');
const splash = document.getElementById('splash');
const mainContent = document.getElementById('main-content');
const skipBtn = document.getElementById('skip-btn');

// FUNCTION TO ENTER SITE
function enterSite() {
    splash.style.opacity = "0";

    setTimeout(() => {
        splash.style.display = "none";
        mainContent.style.display = "block";
    }, 500);
}

// COUNTDOWN
const countdownInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft > 0) {
        countdownDisplay.textContent = `Entering site in ${timeLeft}...`;
    } else {
        countdownDisplay.textContent = "Loading...";
        clearInterval(countdownInterval);
        enterSite(); // 🔥 AUTO ENTER AFTER COUNTDOWN
    }
}, 1000);

// SKIP BUTTON
skipBtn.addEventListener('click', () => {
    clearInterval(countdownInterval); // stop countdown
    enterSite(); // go immediately
});