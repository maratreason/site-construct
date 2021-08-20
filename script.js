const sitebarItems = document.querySelector(".sitebar-items");
const sitebar = document.querySelector(".sitebar");
let offsetX;
let offsetY;
let rowIndex = 0;

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
let rows;
let cols;

sitebarItems.addEventListener("dragstart", function(event) {
    current = event.target;
});

site.addEventListener("dragover", function(event) {
    event.preventDefault();
});

site.addEventListener("drop", function() {
    if (current && current.classList.contains("row")) {
        let nodeCopy = current.cloneNode(true);
        nodeCopy.setAttribute("data-row", rowIndex)
        this.appendChild(nodeCopy);
        rowIndex++;
    }
    rows = site.querySelectorAll(".row");

    if (rows) {
        rows.forEach(row => {
            row.addEventListener("dragstart", function(event) {
                current = event.target;
            });
        
            row.addEventListener("dragover", function(event) {
                event.preventDefault();
                event.target.style.borderColor = "#c28b38";
                row.style.paddingBottom = "50px";
            });

            row.addEventListener("dragleave", function(event) {
                event.target.style.borderColor = "#eee";
                row.style.paddingBottom = "15px";
            });

            row.addEventListener("dragend", function(event) {
                event.target.style.borderColor = "#eee";
                row.style.paddingBottom = "15px";
            });
            
            row.addEventListener("drop", function(event) {
                event.target.style.borderColor = "#eee";
                row.style.paddingBottom = "15px";
                if (row.dataset.row == event.target.dataset.row) {
                    if (current && current.classList.contains("col")) {
                        let nodeCopy = current.cloneNode(true);
                        this.appendChild(nodeCopy);
                    }
                    current = null;
                }
            });

            cols = row.querySelectorAll(".col");

            if (cols) {
                cols.forEach(column => {
                    column.addEventListener("dragstart", function(event) {
                        current = event.target;
                    });
                
                    column.addEventListener("dragover", function(event) {
                        event.preventDefault();
                        event.target.style.borderColor = "#000";
                        column.style.paddingBottom = "40px";
                    });
        
                    column.addEventListener("dragleave", function(event) {
                        event.target.style.borderColor = "#ccc";
                        column.style.paddingBottom = "5px";
                    });
        
                    column.addEventListener("dragend", function(event) {
                        event.target.style.borderColor = "#ccc";
                        column.style.paddingBottom = "5px";
                    });
                    
                    column.addEventListener("drop", function(event) {
                        event.target.style.borderColor = "#ccc";
                        column.style.paddingBottom = "5px";
                        if (current) {
                            let nodeCopy = current.cloneNode(true);
                            this.appendChild(nodeCopy);
                        }
                        current = null;
                    });
                });
            }

        });
    }
});

const tabsHeader = document.querySelector(".sitebar-tabs");
const tabsContent = document.querySelectorAll(".sitebar-tab-content");

tabsHeader.addEventListener("click", function(event) {
    tabsHeader.querySelectorAll(".tab-header").forEach(el => {
        el.classList.remove("active")
    });
    // let $target = event.target;
    event.target.classList.add("active");

    tabsContent.forEach(content => {
        content.classList.remove("active");
        if (event.target.dataset.id == content.dataset.id) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
});