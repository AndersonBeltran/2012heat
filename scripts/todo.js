const userDropdown = document.getElementById('userDropdown');
const todosTable = document.getElementById('todosTable');

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

    function loadTodos(userId) {
        fetch(`http://localhost:8083/api/todos`)
          .then(response => response.json())
          .then(todos => {
            const userTodos = todos.filter(todo => todo.userid == userId);
                todosTable.innerHTML = '';
                userTodos.forEach(todo => {
                    const row = document.createElement('tr');
                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = todo.description;
                    row.appendChild(descriptionCell);

                    const deadlineCell = document.createElement('td');
                    deadlineCell.textContent = todo.deadline;
                    row.appendChild(deadlineCell);

                    const completedCell = document.createElement('td');
                    completedCell.textContent = todo.completed ? '✔️' : '❌';
                    row.appendChild(completedCell);

                    todosTable.appendChild(row);
                });
              })
              .catch(error => {
                console.error('Error fetching todos:', error);
              });
          }
          userDropdown.addEventListener('change', function () {
            const userId = this.value; 
            if (userId) {
              loadTodos(userId); 
            } else {
              todosTable.innerHTML = ''; 
            }
          });
          loadUsers();



    // userDropdown.addEventListener('change', function () {
    //   const selectedUser = this.options[this.selectedIndex].text;
    //   if (selectedUser) {
    //     console.log(`Selected User: ${selectedUser}`);
    //     alert(`You selected: ${selectedUser}`); 
    //   }
    // });
    // loadUsers();