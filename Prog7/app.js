import React, { useState, useEffect } from 'react';
import './styles.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Step 1: Fetch tasks from the backend
  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  // Run once when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Step 1: Handle form submission to create a task
  const addTask = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    setTitle('');
    fetchTasks(); // Refresh list after adding
  };

  // Step 1: Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks(); // Refresh list after deleting
  };

  return (
    <div className="container">
      <h2>Full-Stack Tasks</h2>
      
      <form onSubmit={addTask}>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="New task..." 
          required 
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            <button className="del-btn" onClick={() => deleteTask(task._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}