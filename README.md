# 📝 To-Do App (CRUD with REST API)

A clean, responsive, and feature-rich **To-Do Application** built using **Vanilla JavaScript**, **HTML5**, and **CSS3**, integrated with a remote REST API backend (**MockAPI**) for data persistence.

---

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly via API requests.
- **Inline Editing**: Edit existing tasks directly within the UI with a dedicated edit/save layout.
- **UI Validation**: Prevents users from submitting empty or whitespace-only tasks by visually highlighting fields with error indicators.
- **Empty State Handling**: Displays a friendly placeholder message when the to-do list is empty.
- **FontAwesome Icons**: Modern icons used for edit, delete, and save actions.
- **Fully Responsive**: Optimized layout for both desktop browsers and smaller mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Flexbox, Custom Scrollbars, Media Queries), JavaScript (ES6+ Async/Await, Fetch API)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Backend/Database**: [MockAPI](https://mockapi.io/)

---

## 📁 Project Structure

```text
todo-app-crud-api/
│
├── index.html       # Main HTML layout structure
├── style.css        # Application styles and responsive design
|── script.js        # API integration, DOM manipulation, and event handling
└── README.md        # Project documentation 
```


## 🌐 API Endpoints Used
This application connects to a remote mock REST endpoint supporting pagination parameters:

- **Base URL**: `https://6acf499903feaa52b21e489a.mockapi.io/todo/tasks`

- **GET** (`/tasks`) - Fetch all tasks 

- **POST** (`/tasks`) - Add a new task

- **PUT** (`/tasks/:id`) - Update an existing task by ID

- **DELETE** (`/tasks/:id`) - Remove a task by ID



## ⚙️ How to Setup Locally
To run this project locally on your machine, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dev-deepak-prajapati/todo-app-crud-api.git
   ```

2. **Navigate into the directory:**
   ```bash
   cd todo-app-crud-api
   ```

3. **Open the project:**
   Simply double-click `index.html` or run it using an extension like **Live Server** in VS Code.


## 📄 License

This project is licensed under the MIT License - feel free to use and modify it for your own learning or projects!


## 💡 Author
Built with ❤️ by Deepak Prajapati.

