/* menu de navegacion */

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const closeButton = document.querySelector('.menu-close-button');

    menuIcon.addEventListener('click', function() {
        menu.classList.toggle('show');
        closeButton.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        menu.classList.remove('show');
        closeButton.style.display = 'none';
    });
});


const textToAnimate = "Hola, mi nombre es";
const animatedText = document.getElementById("animated-text");

let currentIndex = 0;

function animateText() {
    if (currentIndex < textToAnimate.length) {
        animatedText.textContent += textToAnimate[currentIndex];
        currentIndex++;
        setTimeout(animateText, 100);
    }
}

animateText();


  