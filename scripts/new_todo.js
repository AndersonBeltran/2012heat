"use strict";

//users
document.addEventListener("DOMContentLoaded", async () => {
  const userSelect = document.getElementById("user");

  async function loadUsers() {
    const response = await fetch("http://localhost:8083/api/users");
    const users = await response.json();

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      userSelect.appendChild(option);
      const userId = document.getElementById("user").value;
      console.log("User:", userId);
    });
  }

  await loadUsers();
});

// categories
document.addEventListener("DOMContentLoaded", async () => {
  const categorySelect = document.getElementById("category");
  async function loadCategories() {
    const response = await fetch("http://localhost:8083/api/categories");
    const category = await response.json();

    category.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
      const categoryId = document.getElementById("category").value;
      console.log("Category:", categoryId);
    });
  }
  await loadCategories();
});

// priority
document.addEventListener("DOMContentLoaded", async () => {
  const prioritySelect = document.getElementById("priority");
  async function loadPriorties() {
    const response = await fetch("http://localhost:8083/api/todos");
    const priorities = await response.json();

    priorities.forEach((priorityOption) => {
      const option = document.createElement("option");
      option.value = priorityOption.id;
      option.textContent = priorityOption.name;
      // prioritySelect.appendChild(option); commented out bcuz it added too many
      const priority = document.getElementById("priority").value;
      console.log("Priority:", priority);
    });
  }
  await loadPriorties();
});

//description textbox and submitting button
document.addEventListener("DOMContentLoaded", () => {
  const description = document.getElementById("describeText");
  const submitButton = document.getElementById("submitButton");

  //deadline
  const deadlineSelect = document.getElementById("deadline");
  const deadlineDate = deadline.value;
  console.log("Deadline:", deadlineDate);

  //submit button
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const describeText = description.value;
    console.log(describeText);

    if (describeText.trim() === "") {
      alert(`Please add a description or title for the task!`);
      return;
    }

    // save data to local storage
    const taskData = {
      description: describeText,
      deadline: deadlineDate,
      user: userId,
      category: categoryId,
      priority: priority,
    };

    localStorage.setItem("savedTask", JSON.stringify(taskData));

    //saved task alert for end
    alert(`Task saved! Let's get busy!`);
  });
});
