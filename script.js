function loadCSV() {
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            renderEntries(results.data);
        }
    });
}

function renderEntries(data) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    // Sort by year descending
    data.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    data.forEach(entry => {
        if (!entry.tag || !entry.title || !entry.link) return; // Skip incomplete rows

        const div = document.createElement("div");
        div.className = `entry ${entry.tag.toLowerCase()}`;
        div.dataset.tag = entry.tag.toLowerCase();
        div.onclick = () => window.open(entry.link, "_blank");
        div.innerHTML = `
    <img src="${entry.image}" alt="${entry.title}" />
    <div class="entry-title">${entry.title} (${entry.year})</div>
    <div class="entry-tagline">${entry.tagline}</div>
  `;
        grid.appendChild(div);
    });

}



// document.querySelectorAll("nav button").forEach(btn => {
//     btn.addEventListener("click", () => {
//         const filter = btn.dataset.filter;
//         document.querySelectorAll(".entry").forEach(el => {
//             el.style.display = (filter === "all" || el.dataset.tag === filter) ? "block" : "none";
//         });
//     });
// });

document.querySelectorAll("nav button").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        // Filter project entries only
        document.querySelectorAll(".entry").forEach(el => {
            el.style.display = (filter === "all" || el.dataset.tag === filter) ? "block" : "none";
        });

        // Resume links now stay visible always — no changes needed
    });
});




loadCSV();