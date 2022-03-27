import './App.css';

import { Toaster } from 'react-hot-toast';

import SingUp from './pages/singup';
import Tasks from './pages/tasks';
import Login from './pages/login';
import Home from './pages/home'


import { AuthProvider } from './context/authContext';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
function App() {

  const PrivateRoute = ({children, redirectTo}) => {
    const isAuthenticated = localStorage.getItem('userUid')  !== null
    return isAuthenticated ? children : <Navigate to={redirectTo} />
  }
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
      <AuthProvider>
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/singup' element={<SingUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<p>There's nothing here: 404!</p>} />
          <Route path='/tasks/:uid' element={<PrivateRoute redirectTo='/login'>
            <Tasks />
             </PrivateRoute>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
