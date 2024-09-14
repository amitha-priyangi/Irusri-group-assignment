import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import { AuthProvider } from './context/AuthContext';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <SignUp />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
