const searchContainer = document.querySelector(".notes-search, .books-search");
const resourceGrid = document.querySelector(".resource-grid, .books-grid");
const resourceCount = document.querySelector(
    ".resource-count span, .books-count span"
);

if (!searchContainer || !resourceGrid || !resourceCount) {
    throw new Error("Resource search could not find the expected page elements.");
}

const searchInput = searchContainer.querySelector("input");
const searchButton = searchContainer.querySelector("button");
const resourceCards = Array.from(
    resourceGrid.querySelectorAll(".resource-card, .book-card")
);

if (!searchInput || !searchButton || resourceCards.length === 0) {
    throw new Error("Resource search could not find its input, button, or cards.");
}

const searchableText = resourceCards.map((card) =>
    Array.from(card.querySelectorAll("h3, .subject-tag, .book-subject, .preview-subject"))
        .map((element) => element.textContent.trim().toLocaleLowerCase())
        .join(" ")
);

function filterResources() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    resourceCards.forEach((card, index) => {
        const matches = searchableText[index].includes(query);
        card.hidden = !matches;

        if (matches) {
            visibleCount += 1;
        }
    });

    resourceCount.textContent = visibleCount;
}

searchInput.addEventListener("input", filterResources);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        filterResources();
    }
});
searchButton.addEventListener("click", filterResources);
