document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const userData = { name, username, password };

    fetch('http://localhost:8083/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                alert('User registered successfully!');
                this.reset();
            } else if (response.status === 403) {
                alert('Username already in use!');
            } else {
                throw new Error('Failed to register user');
            }
        })
        .catch(error => console.error('Error:', error));
});
