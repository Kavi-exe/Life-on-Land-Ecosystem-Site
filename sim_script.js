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
        bg = "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1";
        percent = 30;
    } else if(total <= 9){
        level = "Medium Impact";
        bg = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
        percent = 65;
    } else {
        level = "High Impact";
        bg = "https://images.unsplash.com/photo-1508780709619-79562169bc64";
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