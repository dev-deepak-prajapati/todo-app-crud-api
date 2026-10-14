const API = 'https://6acf499903feaa52b21e489a.mockapi.io/todo/tasks';

const newTask = document.querySelector('#inputText');
const addTaskBtn = document.querySelector('#addTodoBtn');
const todoList = document.querySelector('.todoList');

const TASK_LISTS = async function () {
    const response = await fetch(API);
    let tasks = await response.json();
    return tasks.reverse();
};

async function getTasks() {
    const tasks = await TASK_LISTS();
    todoList.innerHTML = '';

    // Check if the to-do list is empty
    if (tasks.length === 0) {
        todoList.innerHTML = `
            <p class="empty">
                No tasks available. Add a new task above!
            </p>
        `;
        return;
    }

    tasks.forEach((task) => {
        let divEle = document.createElement('div');
        divEle.classList.add('todo');

        divEle.innerHTML = `
              <div class="editBox">
                     <input
                            id="editText"
                            type="text"
                            value="${task.taskName}"
                            placeholder="Edit your task..."
                     />
                     <button class="saveTodoBtn"><i class="fa-solid fa-check"></i></button>
              </div>
              <div class="showBox">
                     <p>${task.taskName}</p>
                     <div class="btnActions">
                            <button class="edit-btn">
                                   <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="delete-btn">
                                   <i class="fa-solid fa-trash"></i>
                            </button>
                     </div>
              </div>
       `;

        divEle.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task.id);
        });

        divEle.querySelector('.edit-btn').addEventListener('click', () => {
            divEle.querySelector('.showBox').style.display = 'none';
            divEle.querySelector('.editBox').style.display = 'flex';
        });

        const editText = divEle.querySelector('#editText');

        // Reset border when typing in edit input
        editText.addEventListener('input', () => {
            editText.style.border = '';
        });

        divEle
            .querySelector('.saveTodoBtn')
            .addEventListener('click', async () => {
                const oldTask = editText.value;

                // UI Validation for Edit
                if (oldTask.trim() === '') {
                    editText.style.border = '1.5px solid #ff4d4d';
                    return;
                }

                editText.style.border = '';
                await updateEditTask(task.id, oldTask);
                divEle.querySelector('.showBox').style.display = 'flex';
                divEle.querySelector('.editBox').style.display = 'none';
            });

        todoList.append(divEle);
    });
}

async function updateEditTask(id, oldTask) {
    const task = { taskName: oldTask.trim() };

    let response = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (response.status === 200) {
        getTasks();
    }
}

async function postTask() {
    const taskName = newTask.value.trim();

    // UI Validation for Add Task
    if (taskName === '') {
        newTask.style.border = '1.5px solid #ff4d4d';
        newTask.placeholder = 'Please enter a task!';
        return;
    }

    const task = { taskName };

    let response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (response.status === 201) {
        getTasks();
        newTask.value = '';
    }
}

async function deleteTask(id) {
    let response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {
        getTasks();
    }
}

// Reset border/placeholder when user starts typing in the main input
newTask.addEventListener('input', () => {
    newTask.style.border = '';
    newTask.placeholder = 'Type a new task...';
});

// initial render the existing tasks
getTasks();

addTaskBtn.addEventListener('click', postTask);
