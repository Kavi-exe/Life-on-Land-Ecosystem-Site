let selected = [];
const cards = document.querySelectorAll(".cards");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progressBar");

cards.forEach(card => {
    const button = card.querySelector("button");

    function toggleCard() {
        let value = parseInt(card.dataset.points);

        if(card.classList.contains("selected")){
            card.classList.remove("selected");
            selected = selected.filter(v => v !== value);
            button.textContent = "Select";
            button.disabled = false;
        } else {
            card.classList.add("selected");
            selected.push(value);
            button.textContent = "Selected";
            button.disabled = true;
        }
        updateUI();
    }

    card.addEventListener("click", (e) => {
        if(e.target.tagName !== "BUTTON") toggleCard();
    });
    button.addEventListener("click", toggleCard);
});

function updateUI(){
    let total = selected.reduce((a,b)=>a+b,0);

    if(total === 0){
        document.body.style.backgroundImage = "";
        feedback.innerHTML = `Impact Score: 0 | Level: None`;
        progressBar.style.width = "0%";
        return;
    }

    let level, bg, percent;

    if(total <= 4){
        level = "Low Impact";
        bg = "images/low.jpg";
        percent = 30;
    } else if(total <= 9){
        level = "Medium Impact";
        bg = "images/medium.jpg";
        percent = 65;
    } else {
        level = "High Impact";
        bg = "images/high.jpg";
        percent = 100;
    }

    feedback.innerHTML = `Impact Score: ${total} | Level: ${level}`;
    progressBar.style.width = percent+"%";
    document.body.style.backgroundImage = `url(${bg})`;
}

function resetAll(){
    selected = [];
    cards.forEach(c => {
        c.classList.remove("selected");
        c.querySelector("button").textContent = "Select";
        c.querySelector("button").disabled = false;
    });
    updateUI();
}