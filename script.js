let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const currentStreak = document.getElementById("currentStreak");

const message = document.getElementById("message");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateStats() {
  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completed;

  if (completed > 0) {
    currentStreak.textContent = "1 🔥";
  } else {
    currentStreak.textContent = "0 🔥";
  }
}


function showMessage(text) {
  message.textContent = text;

  setTimeout(function () {
    message.textContent = "";
  }, 2000);
}


function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });


    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      showMessage("Task deleted");
    });


    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });

  updateStats();
}


function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showMessage("Please enter a task");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  showMessage("Task added successfully");
}


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


clearCompletedBtn.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  renderTasks();

  showMessage("Completed tasks cleared");
});


renderTasks();