# Task Manager API

A Node.js-based task management API with authentication, CRUD operations, and JWT-based security.

# Features

- User authentication with JWT
- Create, read, update, and delete tasks
- Secure endpoints with role-based access control
- Uses Express.js, MongoDB, and RTK Query for frontend API calls

# Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT (JSON Web Tokens)
- State Management (Frontend): Redux Toolkit & RTK Query

# Setup Instructions







Clone the project

```bash
  git clone https://github.com/dev-manoranjan/task-manager-node.git
```

Go to the project directory

```bash
  cd task-manager-node
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```


## API Reference

#### Authentication

| Method | Endpoint     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/login` | User login |
| `POST` | `/auth/reset-password` | Resets user's password |

#### Tasks

| Method | Endpoint     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `GET`      | `/tasks` | Get all tasks |
| `GET`      | `/tasks/:id` | Get a specific task |
| `POST`      | `/tasks` | Create a new task |
| `PUT`      | `/tasks/:id` | Update a task |
| `DELETE`      | `/tasks/:id` | Delete a task |


