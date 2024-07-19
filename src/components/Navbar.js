import React, { useState } from 'react';

const Navbar = ({ tasks, setFilteredTasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterTasks(term, priorityFilter, statusFilter);
  };

  const handlePriorityFilter = (e) => {
    const priority = e.target.value;
    setPriorityFilter(priority);
    filterTasks(searchTerm, priority, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterTasks(searchTerm, priorityFilter, status);
  };

  const filterTasks = (term, priority, status) => {
    let filtered = tasks;
    if (term) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (priority) {
      filtered = filtered.filter(task => task.priority === priority);
    }
    if (status) {
      filtered = filtered.filter(task =>
        status === 'completed' ? task.completed : !task.completed
      );
    }
    setFilteredTasks(filtered);
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto bg-gray-600 p-4">
        <div className="text-green-400 text-5xl font-bold">
          Task Manager
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-2 py-1 rounded"
          />
          <select value={priorityFilter} onChange={handlePriorityFilter} className="px-2 py-1 rounded">
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select value={statusFilter} onChange={handleStatusFilter} className="px-2 py-1 rounded">
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not Completed</option>
          </select>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
