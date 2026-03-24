const profileData = {
    step1: { name: null, username: null, role: null },
    step2: { animal: null, habitat: null, topic: null },
    step3: { action: null, goal: null, volunteer: null }
};

const promptsConfig = [
    {
        step: 1,
        title: "Personal Details",
        questions: [
            { key: 'name', text: "What is your full name?" },
            { key: 'username', text: "Choose a username for your profile:" },
            { key: 'role', text: "What is your role? (e.g. Student, Activist, Guest)" }
        ]
    },
    {
        step: 2,
        title: "Interests & Preferences",
        questions: [
            { key: 'animal', text: "What is your favorite land animal?" },
            { key: 'habitat', text: "What is your preferred habitat to explore (e.g. Forest, Desert, Mountains)?" },
            { key: 'topic', text: "Which conservation topic interests you the most?" }
        ]
    },
    {
        step: 3,
        title: "Actions & Goals",
        questions: [
            { key: 'action', text: "What recent action have you taken to support the environment?" },
            { key: 'goal', text: "What is your primary conservation goal for the upcoming year?" },
            { key: 'volunteer', text: "Would you like to volunteer with us? (Yes/No)" }
        ]
    }
];

function updateProgress() {
    let answered = 0;
    const totalQuestions = 9;

    // Check Step 1
    let s1 = 0;
    if (profileData.step1.name) s1++;
    if (profileData.step1.username) s1++;
    if (profileData.step1.role) s1++;
    answered += s1;
    if (s1 > 0) document.getElementById("section-1").style.display = "block";

    // Check Step 2
    let s2 = 0;
    if (profileData.step2.animal) s2++;
    if (profileData.step2.habitat) s2++;
    if (profileData.step2.topic) s2++;
    answered += s2;
    if (s2 > 0) document.getElementById("section-2").style.display = "block";

    // Check Step 3
    let s3 = 0;
    if (profileData.step3.action) s3++;
    if (profileData.step3.goal) s3++;
    if (profileData.step3.volunteer) s3++;
    answered += s3;
    if (s3 > 0) document.getElementById("section-3").style.display = "block";

    // Progress Bar Update
    let percent = Math.round((answered / totalQuestions) * 100);
    const pb = document.getElementById("progress-bar");
    pb.style.width = percent + "%";
    pb.innerText = percent + "%";

    document.getElementById("progress-text").innerText = `Profile Completion: ${percent}%`;

    if (answered > 0) {
        document.getElementById("profile-output").style.display = "block";
        document.getElementById("progress-wrapper").style.display = "block";
    }

    // Button visibility based on completion
    if (answered < totalQuestions) {
        document.getElementById("resume-btn").style.display = "inline-block";
    } else {
        document.getElementById("resume-btn").style.display = "none";
    }

    if (percent === 100) {
        document.getElementById("start-btn").style.display = "none";
    }
}

function updateOutput() {
    const map = {
        'name': 'out-name', 'username': 'out-username', 'role': 'out-role',
        'animal': 'out-animal', 'habitat': 'out-habitat', 'topic': 'out-topic',
        'action': 'out-action', 'goal': 'out-goal', 'volunteer': 'out-volunteer'
    };

    for (let step in profileData) {
        for (let key in profileData[step]) {
            let textEl = document.getElementById(map[key]);
            let parentEl = document.getElementById("p-" + key);

            if (profileData[step][key] !== null) {
                textEl.innerText = profileData[step][key];
                parentEl.style.display = "block";
            } else {
                parentEl.style.display = "none"; // Hide skipped questions
            }
        }
    }
}

function runStep(stepIndex) {
    if (stepIndex >= promptsConfig.length) {
        updateProgress();
        updateOutput();
        return;
    }

    let stepObj = promptsConfig[stepIndex];
    let confirmStep = confirm(`--- Step ${stepIndex + 1}: ${stepObj.title} ---\nWould you like to complete this section now? (Click Cancel to skip entire step)`);

    if (confirmStep) {
        for (let q of stepObj.questions) {
            let stepKey = 'step' + (stepIndex + 1);
            if (profileData[stepKey][q.key] === null) {
                let ans = prompt(q.text + "\n(Leave blank or click Cancel to skip)");
                if (ans !== null && ans.trim() !== "") {
                    profileData[stepKey][q.key] = ans.trim();
                }
            }
        }
    }

    updateProgress();
    updateOutput();

    // Proceed to next step with a slight delay
    setTimeout(() => {
        runStep(stepIndex + 1);
    }, 300);
}

function startProfileBuilding() {
    document.getElementById("start-btn").style.display = "none";
    runStep(0);
}

function resumeSkippedSteps() {
    let stepsResumed = false;
    for (let i = 0; i < promptsConfig.length; i++) {
        let stepObj = promptsConfig[i];
        let stepKey = 'step' + (i + 1);

        let hasSkipped = stepObj.questions.some(q => profileData[stepKey][q.key] === null);
        if (hasSkipped) {
            let wantsToFill = confirm(`You have missing information in [Step ${i + 1}: ${stepObj.title}].\nDo you want to fill it in now?`);
            if (wantsToFill) {
                stepsResumed = true;
                for (let q of stepObj.questions) {
                    if (profileData[stepKey][q.key] === null) {
                        let ans = prompt(q.text + "\n(Leave blank or click Cancel to skip)");
                        if (ans !== null && ans.trim() !== "") {
                            profileData[stepKey][q.key] = ans.trim();
                        }
                    }
                }
            }
            updateProgress();
            updateOutput();
        }
    }
    if (!stepsResumed) {
        alert("No skipped questions were updated at this time.");
    }
}