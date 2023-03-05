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

// class 26 part - 4 dekhte hobe (search er part class 26 er part - 2 )