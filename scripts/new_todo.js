"use strict"

// 3 drop downs todos, api/categories , urgency classifications
// text area
// input type

//users
    document.addEventListener("DOMContentLoaded", async () => {
        const userSelect = document.getElementById("user");
    
        async function loadUsers() {
            const response = await fetch("http://localhost:8083/api/users");
            const users = await response.json();
    
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.id; 
                option.textContent = user.name; 
                userSelect.appendChild(option);
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

        category.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id; 
                option.textContent = category.name; 
                categorySelect.appendChild(option);
        })
        
    }
    await loadCategories();
});

// priority
document.addEventListener("DOMContentLoaded", async () => {
    const prioritySelect = document.getElementById("priority");
    async function loadPriorties() {
        const response = await fetch("http://localhost:8083/api/todos");
        const priority = await response.json();

        priority.forEach(priority => {
                const option = document.createElement("option");
                option.value = priority.id; 
                option.textContent = priority.name; 
                // prioritySelect.appendChild(option); commented out bcuz it added too many
        })
        
    }
    await loadPriorties();
});

//description textbox and submitting button 
document.addEventListener("DOMContentLoaded", () => {
    const description = document.getElementById("describeText")
    const submitButton = document.getElementById("submitButton")

//save to local storage
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const describeText = description.value;
    console.log(describeText);
    
    if (describeText.trim() === "") {
        alert(`Please add a description or title for the task!`)
        return;
    }

    localStorage.setItem("savedDescription", describeText);
    alert(`Task saved! Let's get busy!`);
    });
});

    // const deadlineSelect = document.getElementById("deadline")
    