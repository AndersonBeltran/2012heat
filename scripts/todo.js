const userDropdown = document.getElementById("userDropdown");
const todosTable = document.getElementById("todosTable");

function loadUsers() {
  fetch("http://localhost:8083/api/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

function loadTodos(userId) {
  fetch(`http://localhost:8083/api/todos`)
    .then((response) => response.json())
    .then((todos) => {
      const userTodos = todos.filter((todo) => todo.userid == userId);
      while (todosTable.firstChild) {
        todosTable.removeChild(todosTable.firstChild);
      }
      userTodos.forEach((todo) => {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = todo.description;
        row.appendChild(descriptionCell);

        const deadlineCell = document.createElement("td");
        deadlineCell.textContent = todo.deadline;
        row.appendChild(deadlineCell);

        // Completed cell with dropdown
        const completedCell = document.createElement("td");
        const statusDropdown = document.createElement("select");
        statusDropdown.className = "form-select";

        // Dropdown options
        const pendingOption = document.createElement("option");
        pendingOption.value = "Pending";
        pendingOption.textContent = "Pending";
        if (!todo.completed) pendingOption.selected = true;

        const inProgressOption = document.createElement("option");
        inProgressOption.value = "In Progress";
        inProgressOption.textContent = "In Progress";
        if (todo.completed === "In Progress") inProgressOption.selected = true;

        const completedOption = document.createElement("option");
        completedOption.value = "Completed";
        completedOption.textContent = "Completed";
        if (todo.completed) completedOption.selected = true;

        // Append options to dropdown
        statusDropdown.appendChild(pendingOption);
        statusDropdown.appendChild(inProgressOption);
        statusDropdown.appendChild(completedOption);

        statusDropdown.addEventListener("change", () => updateTodoStatus(todo.id, statusDropdown.value));
        completedCell.appendChild(statusDropdown);
        row.appendChild(completedCell);

        // Delete button
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTodo(todo.id, userId));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        todosTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
}

// Update todo status
function updateTodoStatus(todoId, newStatus) {
  const statusValue = newStatus === "Completed";

  fetch(`http://localhost:8083/api/todos/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: statusValue }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      alert("Task status updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
    });
}

// Delete todo
function deleteTodo(todoId, userId) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  fetch(`http://localhost:8083/api/todos/${todoId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      alert("Task deleted successfully!");
      loadTodos(userId); // Reload tasks after deletion
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    });
}

userDropdown.addEventListener("change", function () {
  const userId = this.value;
  if (userId) {
    loadTodos(userId);
  } else {
    while (todosTable.firstChild) {
      todosTable.removeChild(todosTable.firstChild);
    }
  }
});
loadUsers();
