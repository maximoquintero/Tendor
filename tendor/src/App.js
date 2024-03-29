import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Historial from './pages/Historial';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/registro",
      element: <Registro/>
    },
    {
      path:"/dashboard",
      element: <Dashboard/>
    },
    {
      path:"/historial",
      element: <Historial/>
    },
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
