
function returnCurrentYear() {
    let currentYear = new Date().getFullYear();

    if(currentYear < 2022) {
        currentYear = 2022;
    }
    return currentYear;
}


let spansOutput;
window.addEventListener("load", () => {
    spansOutput = document.querySelectorAll("span.current-year");

    for (const span of spansOutput) {
        span.textContent = returnCurrentYear();
    }
});