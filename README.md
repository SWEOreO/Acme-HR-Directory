# Acme HR Directory

## Overview
The **Acme HR Directory** is an API that allows the Acme Human Resources (HR) Department to efficiently manage employees and departments. The system establishes a **one-to-many relationship**, where each department can have multiple employees, and each employee must be associated with a department.

## Features
- Employees belong to departments.
- Departments contain multiple employees.
- RESTful API routes to manage employees and departments.
- Error handling for better API usability.

## API Routes

### Employees
| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| GET    | `/api/employees`         | Returns an array of employees. |
| POST   | `/api/employees`         | Creates a new employee. The request body must include the employee's name and department ID. |
| PUT    | `/api/employees/:id`     | Updates an existing employee by ID. The request body must include updated employee details. |
| DELETE | `/api/employees/:id`     | Deletes an employee by ID. |

### Departments
| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| GET    | `/api/departments`       | Returns an array of departments. |

### Error Handling
- An error-handling route will return an object containing an `error` property with a relevant message when an issue occurs.

## Database Schema

### Department Table
| Column | Type |
|--------|------|
| id     | INTEGER (Primary Key) |
| name   | STRING |

### Employee Table
| Column        | Type |
|--------------|------|
| id           | INTEGER (Primary Key) |
| name         | STRING |
| department_id | INTEGER (Foreign Key referencing `departments.id`) |

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/acme_hr_directory.git
cd acme_hr_directory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the Database
- Create the **departments** and **employees** tables.
- Seed the tables with some sample data.

### 4. Start the Server
```bash
npm start
```
The server will listen on a designated port (e.g., `localhost:3000`).

### 5. Test the API
Use **Postman** or **cURL** to test the API routes.

## Technologies Used
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg (Node.js PostgreSQL Client)**

## Future Enhancements
- Implement authentication for role-based access control.
- Add a frontend interface for easier HR management.
- Expand employee details (e.g., salary, job title, hire date).

## License
This project is licensed under the MIT License.

---
