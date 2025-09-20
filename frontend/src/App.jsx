import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/boards" replace />} />
            <Route path="/boards" element={<BoardList />} />
            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
