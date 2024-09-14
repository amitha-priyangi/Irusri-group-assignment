import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load existing users from localStorage
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    return storedUsers;
  });

  const [user, setUser] = useState(null); // Currently logged-in user

  // Load the user from localStorage when the app initializes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Register a new user and store them in localStorage
  const register = (values) => {
    const { name, email, password } = values;
    const newUser = { name, email, password };
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert('User with this email already exists!');
      return;
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Login function to validate credentials
  const login = (values) => {
    const { email, password } = values;
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser)); // Store the logged-in user
    } else {
      alert('Invalid email or password');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
