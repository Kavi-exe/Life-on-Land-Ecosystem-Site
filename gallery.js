const images = document.querySelectorAll(".img-box");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("closeBtn");
const colorPicker = document.getElementById("colorPicker");
const fontPicker = document.getElementById("fontPicker");
const textControls = document.getElementById("textControls");


images.forEach((box) => {
    box.addEventListener("click", () => {

        const img = box.querySelector("img").src;
        const title = box.querySelector(".image-title").innerText;
        const desc = box.querySelector(".image-description").innerText;

        modal.style.display = "block";
        modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;

        textControls.style.display = "block"; // 👈 show controls
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
    textControls.style.display = "none"; // 👈 hide controls
};

colorPicker.addEventListener("input", () => {
    modalDesc.style.color = colorPicker.value;
});

fontPicker.addEventListener("change", () => {
    modalDesc.style.fontFamily = fontPicker.value;
});

window.onclick = (point) => {
    if (point.target == modal) {
        modal.style.display = "none";
    }
};