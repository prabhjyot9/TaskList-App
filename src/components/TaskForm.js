import React, { useState } from 'react';

const TaskForm = ({ updateTasks, tasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const presentDay = new Date();
  presentDay.setDate(presentDay.getDate() - 3);
  const formattedPresentday = presentDay.toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false
    };
    updateTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Low');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form mb-4 p-4 border max-w-6xl rounded-lg shadow-md mx-auto my-5">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="date"
        min={formattedPresentday}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="block w-full mb-2 p-2 border rounded">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
