var currentHours = new Date().getHours();
var userName = "Nidhi";
var currentDate = new Date().toDateString();

// to display greeting and date
document.getElementById("greetings").innerHTML =
    currentHours >= 12 && currentHours < 16
        ? `Good Afternoon, ${userName}!`
        : currentHours >= 16
            ? `Good Evening, ${userName}!`
            : `Good Morning, ${userName}!`;

if (currentDate) {
    document.getElementById("date").innerHTML = `Today, ${currentDate}`;
} else {
    document.getElementById("date").innerHTML = `${currentDate}`;
}

// to open and close popup
function managePopup() {
    var dialogBox = document.getElementById("popupDialog");
    dialogBox.classList.toggle("hidden");
    dialogBox.style.opacity = dialogBox.style.opacity === "1" ? "0" : "1";
}

// add task
function addTask(event) {
    event.preventDefault();
    managePopup();

    const form = document.querySelector("form");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    form.reset();
    selectedDate();

    fetch("/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((response) => {
            generateGrid(response);
        })
        .catch((error) => {
            console.error("Error sending data:", error);
        });
}
