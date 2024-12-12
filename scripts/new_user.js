document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect input values
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate that passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Prepare user data
  const userData = { name, username, password };

  // Send POST request to the API
  fetch("http://localhost:8083/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        alert("User registered successfully!");
        // Redirect to the todos.html page
        window.location.href = "todo.html";
      } else if (response.status === 403) {
        alert("Username already in use. Please try another!");
      } else {
        throw new Error("Failed to register user");
      }
    })
    .catch((error) => console.error("Error:", error));
});
