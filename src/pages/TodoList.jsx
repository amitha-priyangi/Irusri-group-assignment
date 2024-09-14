import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, List, ListItem, ListItemText, Checkbox, TextField, IconButton, Grid, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const TodoList = () => {
  const { user, logout } = useContext(AuthContext); 
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null); 
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const navigate = useNavigate();

  // If user is not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Load user's todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(user?.email)) || [];
    setTodos(storedTodos);
  }, [user]);

  // Save todos to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(user.email, JSON.stringify(todos));
    }
  }, [todos, user]);

  // Add a new todo
  const addTodo = () => {
    if (newTitle && newDescription) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTitle,
          description: newDescription,
          completed: false,
        },
      ]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit a todo
  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const saveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editTitle, description: editDescription } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditTitle('');
    setEditDescription('');
  };

  // Toggle todo completion status
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <Box>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user?.name}'s Todo List
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Add a New Todo
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              label="Title"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              label="Description"
              fullWidth
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />} 
              onClick={addTodo}
              sx={{
                height: '100%',  
                padding: '10px 16px',  
              }}
            >
              Add Todo
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          Your Todos
        </Typography>
        <List>
          {todos
            // Sort incomplete first, completed last
            .sort((a, b) => a.completed - b.completed) 
            .map((todo) => (
              <ListItem
                key={todo.id}
                sx={{ 
                  mb: 2,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  opacity: todo.completed ? 0.6 : 1,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '16px',
                }}
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
                {editingTodoId === todo.id ? (
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Edit Title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Edit Description"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => saveEdit(todo.id)}
                      sx={{ mt: 1 }}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ListItemText
                      primary={todo.title}
                      secondary={todo.description}
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                      }}
                    />
                    <IconButton onClick={() => startEditing(todo)} edge="end">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTodo(todo.id)}
                      edge="end"
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
        </List>
      </Container>
    </Box>
  );
};

export default TodoList;
