const images = document.querySelectorAll(".img-box");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("closeBtn");


images.forEach((box) => {
    box.addEventListener("click", () => {

        const img = box.querySelector("img").src;
        const title = box.querySelector(".image-title").innerText;
        const desc = box.querySelector(".image-description").innerText;

        modal.style.display = "block";
        modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (point) => {
    if (point.target == modal) {
        modal.style.display = "none";
    }
};