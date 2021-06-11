class TabSwitcher {
    constructor(tabs, tabContainers) {
        this.tabs = tabs;
        this.tabContainers = tabContainers;
        this.$tabs = document.querySelectorAll(this.tabs);
        this.$containers = document.querySelectorAll(this.tabContainers);
    }

    initializeTabSwitcher() {
        this.$tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                if (!tab.classList.contains("active")) {
                    this.tabIndex = tab.dataset.index;
                    this.tabContainer = document.querySelector(
                        `${this.tabContainers}[data-index='${this.tabIndex}']`
                    );

                    for (let el of this.$tabs) el.classList.remove("active");
                    for (let el of this.$containers)
                        el.classList.remove("active");
                    tab.classList.add("active");
                    this.tabContainer.classList.add("active");
                }
            });
        });
    }

    disabledTab(index) {
        document
            .querySelector(`${this.tabs}[data-index='${index}']`)
            .classList.add("disabled");
    }
}

const thousandSeparators = (amount) => {
    let n = amount.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
};

const outLifeMoney = (amount) => {
    return (
        "$" +
        amount.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")
    );
};

function digitsOnly(el) {
    el.value = el.value.replace(/\D/g, "");
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}