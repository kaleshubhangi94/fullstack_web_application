import React, { useState } from 'react';
import axios from 'axios';

function CreateTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make an API call to create the task
    axios.post('http://localhost:5000/api/tasks', { name, description }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // if using JWT auth
      }
    })
    .then(response => {
      alert('Task created successfully');
      // Reset form fields
      setName('');
      setDescription('');
    })
    .catch(error => {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    });
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Task Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
