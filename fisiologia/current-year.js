
function returnCurrentYear() {
    let currentYear = new Date().getFullYear();

    if(currentYear < 2022) {
        currentYear = 2022;
    }
    return currentYear;
}


let spanOutput;
window.addEventListener("load", () => {
    spanOutput = document.querySelector("span.current-year");
    spanOutput.textContent = returnCurrentYear();
});