import './App.css';

import Auth from './pages/auth';
import Tasks from './pages/tasks';

import { AuthProvider } from './context/authContext';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
function App() {

  const PrivateRoute = ({children, redirectTo}) => {
    const isAuthenticated = localStorage.getItem('userUid')  !== null
    return isAuthenticated ? children : <Navigate to={redirectTo} />
  }
  return (
    <div className="App">

      <BrowserRouter>
      <AuthProvider>
        <Routes> 
          <Route path='/login' element={<Auth />} />
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
