// Crime Feed functionality
const crimeFeed = document.getElementById("crimeFeed");

// Sample data
const reports = [
    {
        title: "Robbery at Main Street",
        location: "Downtown",
        date: "2025-11-20",
        image: "images/robbery.jpg"
    },
    {
        title: "Vandalism in Park",
        location: "City Park",
        date: "2025-11-22",
        image: "images/vandalism.jpg"
    },
    {
        title: "Suspicious Activity Reported",
        location: "East Side",
        date: "2025-11-25",
        image: "images/suspicious.jpg"
    }
];

// Render reports
if (crimeFeed) {
    reports.forEach(report => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${report.image}" alt="${report.title}" onerror="this.style.display='none'">
            <h3>${report.title}</h3>
            <p><i class="fa fa-map-marker-alt"></i> ${report.location}</p>
            <p><i class="fa fa-calendar"></i> ${report.date}</p>
        `;
        crimeFeed.appendChild(card);
    });
}
