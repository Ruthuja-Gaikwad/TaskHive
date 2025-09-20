import { 
  Route, 
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
import TaskList from './components/TaskList';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Outlet />
            </main>
          </div>
        }
      >
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/tasks" element={<TaskList />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return <RouterProvider router={router} />;
}

export default App
