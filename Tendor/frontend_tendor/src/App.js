import './App.css';
import './css/cards.css';
import 'boxicons'
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
      path:"/dashboard/:objeto",
      element: <Dashboard/>
    },
    {
      path:"/historial/:objeto",
      element: <Historial/>
    },
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
