const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(taskTextFromStorage = null) {
    const taskText = taskTextFromStorage || taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center mb-2 shadow-sm";

    const span = document.createElement("span");
    span.textContent = taskText;
    span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm ms-2";
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    if (!taskTextFromStorage) taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTask(task.text);
        const lastLi = taskList.lastChild;
        if (task.completed) lastLi.classList.add("completed");
    });
}
