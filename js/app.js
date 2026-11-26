
const dateList = document.getElementById("dateList");

let selectedDate = 0;

function generateDates() {

    dateList.innerHTML = "";

    const today = new Date();

    for (let i = 0; i < 30; i++) {

        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayName = i === 0
            ? "Today"
            : date.toLocaleDateString("en-US", {
                weekday: "short"
            });

        const dayNumber = date.getDate();

        const month = date.toLocaleDateString("en-US", {
            month: "short"
        });

        const box = document.createElement("div");

        box.className = "date_box";

        if (i === selectedDate) {
            box.classList.add("active");
        }

        box.innerHTML = `
            <div class="date_text">${dayName}</div>
            <div class="date_num">${dayNumber}</div>
            <div class="date_text">${month}</div>
        `;

        box.addEventListener("click", () => {

            selectedDate = i;

            document.querySelectorAll(".date_box")
                .forEach(el => el.classList.remove("active"));

            box.classList.add("active");

            const selected =
                date.getFullYear() + "-" +
                String(date.getMonth() + 1).padStart(2, "0") + "-" +
                String(date.getDate()).padStart(2, "0");

            console.log("Selected date:", selected);

            // Load movie showtimes for selected date here

        });

        dateList.appendChild(box);
    }
}

generateDates();



const formatPrices = {
    "2D": 0,
    "3D": 1,
    "IMAX": 2.5,
    "4DX": 4
};

const tickets = [
    {
        name: "Child",
        icon: "fa-child",
        people: 1,
        price: 3
    },
    {
        name: "Adult",
        icon: "fa-user",
        people: 1,
        price: 5.5
    },
    {
        name: "Couple",
        icon: "fa-heart",
        people: 2,
        price: 9.5
    },
    {
        name: "Family",
        icon: "fa-people-roof",
        people: 4,
        price: 15
    }
];

// Add actual public holiday dates here
// Format: YYYY-MM-DD
const publicHolidays = [
    // "2026-11-28",
    // "2026-12-25"
];

const dateInput = document.getElementById("ticketDate");
const formatInput = document.getElementById("movieFormat");

function getLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getPricePeriod(date) {

    const dateString = getLocalDate(date);

    if (publicHolidays.includes(dateString)) {
        return {
            name: "Public Holiday Price",
            extra: 1.5
        };
    }

    const day = date.getDay();

    if (day === 0 || day === 5 || day === 6) {
        return {
            name: "Weekend Price",
            extra: 1
        };
    }

    return {
        name: "Weekday Price",
        extra: 0
    };
}

function showTicketPrices() {

    const selectedDate = new Date(
        dateInput.value + "T12:00:00"
    );

    if (isNaN(selectedDate.getTime())) return;

    const format = formatInput.value;

    const period = getPricePeriod(selectedDate);

    document.getElementById("pricePeriod").textContent =
        period.name;

    const container = document.getElementById("ticketPrices");

    container.innerHTML = "";

    tickets.forEach(ticket => {

        const price =
            ticket.price +
            (formatPrices[format] + period.extra) *
            ticket.people;

        container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="ticket-price-card">

                    <i class="fa-solid ${ticket.icon}"></i>

                    <h4>${ticket.name}</h4>

                    <div class="ticket-price">
                        $${price.toFixed(2)}
                    </div>

                    <div class="ticket-note">
                        ${ticket.people} 
                        ${ticket.people === 1 ? "Person" : "Persons"}
                    </div>

                    <div class="ticket-note">
                        ${format}
                    </div>

                </div>
            </div>
        `;
    });
}

// Set today's date
dateInput.value = getLocalDate(new Date());

dateInput.addEventListener("change", showTicketPrices);
formatInput.addEventListener("change", showTicketPrices);

showTicketPrices();
