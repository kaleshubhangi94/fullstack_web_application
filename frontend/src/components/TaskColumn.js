import React from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';  // Add this line to import axios
import Task from './Task';

function TaskColumn({ title, tasks }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => updateTaskStatus(item.id, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const updateTaskStatus = (taskId, status) => {
    axios.put(`${process.env.REACT_APP_API_URL}/tasks/status`, { taskId, status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      // Update tasks after drag
    }).catch((error) => {
      console.error('Error updating task status:', error);
    });
  };

  return (
    <div ref={drop} style={{ width: '300px', border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h2>{title}</h2>
      {tasks.map(task => <Task key={task._id} task={task} />)}
    </div>
  );
}

export default TaskColumn;
