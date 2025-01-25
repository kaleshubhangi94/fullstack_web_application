import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskColumn from '../components/TaskColumn';
import Feed from '../components/Feed';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch tasks
    axios.get('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => setTasks(response.data));

    // Fetch feed posts
    axios.get('http://localhost:5000/api/posts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => setPosts(response.data));
  }, []);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    // Send new task data to the backend
    axios.post('http://localhost:5000/api/tasks', newTask, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({ name: '', description: '' }); // Clear the form after submission
    }).catch((error) => {
      console.error(error);
      alert('Error creating task');
    });
  };

  return (
    <div>
      <h1>Task Management & Feed</h1>

      {/* Task creation form */}
      <div>
        <h2>Create a New Task</h2>
        <form onSubmit={handleTaskSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={newTask.name}
            onChange={handleTaskChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleTaskChange}
            required
          />
          <button type="submit">Create Task</button>
        </form>
      </div>

      {/* Task columns */}
      <div style={{ display: 'flex' }}>
        <TaskColumn title="Pending" tasks={tasks.filter((task) => task.status === 'Pending')} />
        <TaskColumn title="Completed" tasks={tasks.filter((task) => task.status === 'Completed')} />
        <TaskColumn title="Done" tasks={tasks.filter((task) => task.status === 'Done')} />
      </div>

      {/* Feed */}
      <Feed posts={posts} />
    </div>
  );
}

export default Home;
