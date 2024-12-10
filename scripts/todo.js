const userDropdown = document.getElementById('userDropdown');
function loadUsers() {
    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id; 
            option.textContent = user.name; 
            userDropdown.appendChild(option); 
          });
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
    userDropdown.addEventListener('change', function () {
      const selectedUser = this.options[this.selectedIndex].text;
      if (selectedUser) {
        console.log(`Selected User: ${selectedUser}`);
        alert(`You selected: ${selectedUser}`); 
      }
    });
    loadUsers();