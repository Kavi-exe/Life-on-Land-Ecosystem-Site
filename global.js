const btn = document.querySelector('.top-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // adjust this value if needed
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});