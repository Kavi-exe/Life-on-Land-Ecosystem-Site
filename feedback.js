/* CHARACTER COUNTER */
const message = document.getElementById("message");
const counter = document.getElementById("counter");

message.addEventListener("input", () => {
    counter.textContent = (150 - message.value.length) + " characters remaining";
});

/* SIMPLE VALIDATION */
document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();

    let valid = true;

    let name = document.getElementById("name");
    let email = document.getElementById("email");

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";

    if(name.value === ""){
        document.getElementById("nameError").textContent = "Name required";
        valid = false;
    }

    if(email.value === ""){
        document.getElementById("emailError").textContent = "Email required";
        valid = false;
    }

    if(valid){
        document.getElementById("successMsg").textContent = "Thank you for your feedback!";
        this.reset(); // optional: reset form after submit
        counter.textContent = "150 characters remaining";
    }
});