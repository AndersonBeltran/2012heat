document.addEventListener("DOMContentLoaded", async () => {
  const userSelect = document.getElementById("user");
  const categorySelect = document.getElementById("category");
  const prioritySelect = document.getElementById("priority");
  const descriptionInput = document.getElementById("describeText");
  const deadlineInput = document.getElementById("deadline");
  const submitButton = document.getElementById("submitButton");
  const tasksTableBody = document.querySelector("#tasksTable tbody"); // Target only tbody

  // Load users into the dropdown
  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:8083/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();

      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Failed to load users. Please try again.");
    }
  }

  // Load categories into the dropdown
  async function loadCategories() {
    try {
      const response = await fetch("http://localhost:8083/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const categories = await response.json();

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading categories:", error);
      alert("Failed to load categories. Please try again.");
    }
  }

  // Fetch and display tasks for the selected user
  async function loadTasks(userId) {
    try {
      const response = await fetch(`http://localhost:8083/api/todos/byuser/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const tasks = await response.json();

      // Clear existing rows in the table body
      while (tasksTableBody.firstChild) {
        tasksTableBody.removeChild(tasksTableBody.firstChild);
      }

      // Populate the table body
      tasks.forEach((task) => {
        const row = document.createElement("tr");

        // Description
        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;
        row.appendChild(descriptionCell);

        // Category
        const categoryCell = document.createElement("td");
        categoryCell.textContent = task.category;
        row.appendChild(categoryCell);

        // Priority
        const priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;
        row.appendChild(priorityCell);

        // Deadline
        const deadlineCell = document.createElement("td");
        deadlineCell.textContent = task.deadline;
        row.appendChild(deadlineCell);

        // Completed Status
        const statusCell = document.createElement("td");
        statusCell.textContent = task.completed ? "Completed" : "Pending";
        row.appendChild(statusCell);

        tasksTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading tasks:", error);
      alert("Failed to load tasks. Please try again.");
    }
  }

  // Handle form submission
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const userId = userSelect.value;
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const description = descriptionInput.value.trim();
    const deadline = deadlineInput.value;

    // Validate fields
    if (
      !userId ||
      userId === "#" ||
      !category ||
      category === "#" ||
      !priority ||
      priority === "#" ||
      !description ||
      !deadline
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const todoData = {
      userid: userId,
      category: category,
      description: description,
      deadline: deadline,
      priority: priority,
    };

    try {
      const response = await fetch("http://localhost:8083/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });

      if (response.ok) {
        alert("Task successfully added!");
        document.getElementById("newTodoForm").reset(); // Reset the form
        loadTasks(userId); // Reload tasks for the user
      } else {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("An error occurred while adding the task. Please try again.");
    }
  });

  // Handle user selection change to load tasks
  userSelect.addEventListener("change", () => {
    const userId = userSelect.value;
    if (userId && userId !== "#") {
      loadTasks(userId);
    } else {
      while (tasksTableBody.firstChild) {
        tasksTableBody.removeChild(tasksTableBody.firstChild); // Clear the table body
      }
    }
  });

  // Load data into the dropdowns
  await loadUsers();
  await loadCategories();
});
