const API = 'https://6acf499903feaa52b21e489a.mockapi.io/todo/tasks';

const newTask = document.querySelector('#inputText');
const addTaskBtn = document.querySelector('#addTodoBtn');
const todoList = document.querySelector('.todoList');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const pageInfo = document.querySelector('#pageInfo');

let currentPage = 1;
const limit = 5; // Number of tasks per page

const TASK_LISTS = async function (page) {
    // MockAPI supports pagination using ?page=X&limit=Y
    const response = await fetch(`${API}?page=${page}&limit=${limit}`);
    let tasks = await response.json();
    // Since MockAPI returns items ascending, we reverse them to show newest first
    return tasks.reverse();
};

async function getTasks() {
    const tasks = await TASK_LISTS(currentPage);
    todoList.innerHTML = '';

    // Check if the to-do list is empty on the current page
    if (tasks.length === 0 && currentPage === 1) {
        todoList.innerHTML = `
            <p class="empty">
                No tasks available. Add a new task above!
            </p>
        `;
        pageInfo.textContent = `Page 1`;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    // If we went past the last page with data, step back one page
    if (tasks.length === 0 && currentPage > 1) {
        currentPage--;
        getTasks();
        return;
    }

    pageInfo.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;

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

        const editText = divEle.querySelector('#editText');
        const editBtn = divEle.querySelector('.edit-btn');
        const deleteBtn = divEle.querySelector('.delete-btn');
        const showBox = divEle.querySelector('.showBox');
        const editBox = divEle.querySelector('.editBox');
        const saveTodoBtn = divEle.querySelector('.saveTodoBtn');

        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        editBtn.addEventListener('click', () => {
            showBox.style.display = 'none';
            editBox.style.display = 'flex';
        });

        editText.addEventListener('input', () => {
            editText.style.border = '';
        });

        saveTodoBtn.addEventListener('click', async () => {
            const oldTask = editText.value;

            if (oldTask.trim() === '') {
                editText.style.border = '1.5px solid #ff4d4d';
                return;
            }

            editText.style.border = '';
            await updateEditTask(task.id, oldTask);
            showBox.style.display = 'flex';
            editBox.style.display = 'none';
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
        currentPage = 1; // Go to page 1 to see the newly added task
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

// Pagination Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getTasks();
    }
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    getTasks();
});

newTask.addEventListener('input', () => {
    newTask.style.border = '';
    newTask.placeholder = 'Type a new task...';
});

// Initial render
getTasks();

addTaskBtn.addEventListener('click', postTask);
