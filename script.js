const buttons = document.querySelector(".btn");
const sitebarItems = document.querySelector(".sitebar-items");

// ----- sitebar
const sitebar = document.querySelector(".sitebar");
let offsetX;
let offsetY;

sitebar.addEventListener("dragstart", function(event) {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
});

sitebar.addEventListener("dragend", function(event) {
    console.log(event.pageX, event.pageY);
    if (
        !event.target.classList.contains("sitebar")
        || event.target === "IMG"
    ) {
        return false;
    }
    sitebar.style.top = (event.pageY - offsetY) + "px";
    sitebar.style.left = (event.pageX - offsetX) + "px";
});

// -----

const site = document.querySelector(".site");
let current;

sitebarItems.addEventListener("dragstart", function(event) {
    current = event.target;
});

site.addEventListener("dragover", function(event) {
    event.preventDefault();
});

site.addEventListener("drop", function(event) {
    let nodeCopy = current.cloneNode(true);
    this.appendChild(nodeCopy);
    delete nodeCopy;
    nodeCopy.removeAttribute("draggable");
});
