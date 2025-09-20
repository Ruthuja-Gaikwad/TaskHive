# TaskHive - Team Collaboration Tool

TaskHive is a modern task management application that helps teams organize and track their work using boards and cards with drag-and-drop functionality.

## Features

- **Boards Management**
  - Create new boards
  - View all boards
  - Delete boards

- **Task Management**
  - Create tasks with title, description, and deadline
  - View all tasks in a board
  - Edit task details
  - Move tasks between columns (To Do → In Progress → Done)
  - Delete tasks
  - Drag-and-drop interface for task management

## Tech Stack

### Frontend
- React.js with hooks
- React Router for navigation
- TailwindCSS for styling
- React Beautiful DND for drag-and-drop
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd taskhive
   ```

2. Backend Setup:
   ```bash
   cd backend
   npm install
   ```
   Create a .env file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskhive
   NODE_ENV=development
   ```

3. Frontend Setup:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

3. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── services/      # API service functions
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
└── ...

backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── index.js       # Entry point
└── ...
```

## API Endpoints

### Boards
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get a specific board
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Tasks
- `GET /api/tasks/board/:boardId` - Get all tasks in a board
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.