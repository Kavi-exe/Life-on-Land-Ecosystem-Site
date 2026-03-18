 // 1. Countdown Timer Logic
        let timeLeft = 4;
        const countdownDisplay = document.getElementById('countdown-display');
        
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                countdownDisplay.textContent = `Entering site in ${timeLeft}...`;
            } else {
                countdownDisplay.textContent = "Loading...";
                clearInterval(countdownInterval);
            }
        }, 1000);

        // 2. Skip Intro Button Logic
        const skipBtn = document.getElementById('skip-btn');
        skipBtn.addEventListener('click', () => {
            // Optional but recommended: Remove the meta tag so it doesn't try to redirect twice
            const metaTag = document.getElementById('meta-redirect');
            if (metaTag) {
                metaTag.remove(); 
            }
            
            // Redirect immediately to Home Page
            window.location.href = 'home.html';
        });