# Todo App

A full-stack todo application built with Node.js, Express.js, React.js, Redux Toolkit, and TypeScript.

## Features

-  Create, read, update, and delete todo items
-  Organize todos into categories
-  Filter todos by completion status (all, active, completed)
-  Sort todos by due date or creation date
-  Responsive design
-  Group todos by categories in the UI
-  Real-time updates with Redux state management
-  Dark mode theme with toggle and persistence

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- In-memory database (for demo purposes)

### Frontend
- React.js
- Redux Toolkit
- TypeScript
- Vite
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jcline7774/todo-app.git
cd todo-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

#### Quick Start (Recommended)
```bash
# Install all dependencies
npm run install-all

# Run both backend and frontend simultaneously
npm run dev
```

#### Manual Start
1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:3001

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

### Building for Production

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos (supports ?status=active|completed and ?sortBy=dueDate|createdAt)
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `POST /api/categories` - Create a new category

## Project Structure

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── todos.ts
│   │   │   └── categories.ts
│   │   ├── database.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   ├── CategoryForm.tsx
│   │   │   └── FilterControls.tsx
│   │   ├── hooks/
│   │   │   └── useTheme.ts
│   │   ├── store/
│   │   │   ├── index.ts
│   │   │   ├── todoSlice.ts
│   │   │   └── categorySlice.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Usage

1. **Creating Categories**: Click "Add Category" to create new categories for organizing your todos.

2. **Adding Todos**: Click "Add Todo" to create a new todo item with title, description, due date, and category.

3. **Managing Todos**: 
   - Click on a todo title to expand/collapse details
   - Use the checkbox to mark todos as complete/incomplete
   - Click "Edit" to modify a todo
   - Click "Delete" to remove a todo

4. **Filtering and Sorting**:
   - Use the filter buttons to show all, active, or completed todos
   - Use the sort dropdown to order by creation date or due date

5. **Dark Mode**: Click the moon/sun icon in the header to toggle between light and dark themes

## Development Notes

- The backend uses an in-memory database that resets when the server restarts
- All API endpoints include proper error handling and input validation
- The frontend uses Redux Toolkit for efficient state management
- Components are built with TypeScript for type safety
- The application is responsive and works on mobile devices

## Potential Enhancements

- Persistent database (PostgreSQL, MongoDB)
- User authentication and authorization
- Todo sharing and collaboration
- Due date notifications
- Drag and drop functionality
- Export/import functionality
