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

// generate data grid
function generateGrid(task) {
    const ul = document.querySelector(".list-group");

    // create list
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.id = task._id;

    // label
    const label = document.createElement("label");
    label.classList.add("form-check-label", "taskTitle");
    label.id = "taskTitle";
    label.appendChild(document.createTextNode(task.title));

    // checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "taskStatus";
    checkBox.id = "taskStatus";
    checkBox.className = "form-check-input me-2";
    if (task.status) {
        checkBox.checked = true;
        label.style.textDecoration = "line-through";
    } else {
        checkBox.checked = false;
        label.style.textDecoration = "none";
    }
    checkBox.onclick = function () {
        updateTaskStatus(task._id, checkBox.checked, label);
    };
    li.appendChild(checkBox);

    li.appendChild(label);

    const div = document.createElement("div");
    div.classList.add("position-absolute", "top-0", "end-0", "mt-2", "me-2");

    // span - date
    const span = document.createElement("span");
    span.classList.add("me-2");
    span.appendChild(document.createTextNode(task.Tdate.slice(0, 10)));
    div.appendChild(span);

    // delete
    const deleteLabel = document.createElement("label");
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash3";
    deleteLabel.appendChild(deleteIcon);
    deleteLabel.onclick = function () {
        deleteTask(task._id);
    };
    div.appendChild(deleteLabel);

    li.appendChild(div);
    ul.appendChild(li);
}

// update task status
function updateTaskStatus(taskId, status, label) {
    if (status) {
        label.style.textDecoration = "line-through";
    } else {
        label.style.textDecoration = "none";
    }
    fetch(`http://localhost:9001/task/${taskId}?status=${status}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
}

// delete task
function deleteTask(taskId) {
    fetch(`http://localhost:9001/task/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    selectedDate();
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
