// toggle style switcher
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});
// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});
// theme colors
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    localStorage.setItem("themecolor", color);
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}
// light and dark mode
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("themeMode", isDark ? "dark" : "light");
})
window.addEventListener("load", () => {
    const storedTheme = localStorage.getItem("themeColor");
    if (storedTheme) {
        setActiveStyle(storedTheme);
    }
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
    const icon = dayNight.querySelector("i");
    icon.classList.remove("fa-sun", "fa-moon");
    icon.classList.add(document.body.classList.contains("dark") ? "fa-sun" : "fa-moon");
});