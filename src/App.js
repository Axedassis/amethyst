import './App.css';

import Auth from './pages/auth';
import Tasks from './pages/tasks';

import { AuthProvider } from './context/authContext';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <AuthProvider>
        <Routes> 
          <Route path='/login' element={<Auth />} />
          <Route path='*' element={<p>There's nothing here: 404!</p>} />
          <Route path='/tasks/:uid' element={<Tasks />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
