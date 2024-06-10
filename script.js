/**
 * Main JavaScript file
 * 
 * Use this file for any code, like event listeners,
 * that are resused on any of the pages.
 * 
 * NOTE: Make sure to include it at the end of the html file.
 */

// Event listener for changing the nav bar colors when scrolling.
document.addEventListener('scroll', () => {
    const navbar = document.getElementById("myNav");

    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
})