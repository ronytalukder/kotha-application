import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';

function App() {
  return (
    <div>
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

// class 25 part-2 12 minutes  theke dekhte hobe. aj ker modhe ses korte hobe
