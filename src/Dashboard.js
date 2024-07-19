import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    setFilteredTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const sortByDueDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };
  
  const presentDay = new Date();
  const upcomingTasks = sortByDueDate(filteredTasks.filter(task => !task.completed && new Date(task.dueDate) >= presentDay));
  const completedTasks = sortByDueDate(filteredTasks.filter(task => task.completed));
  const overdueTasks = sortByDueDate(filteredTasks.filter(task => !task.completed && new Date(task.dueDate) < presentDay));

  return (
    <div className="min-h-screen bg-gray-100 mx-auto p-4 overflow-hidden" >
      {tasks.length === 0 ? (
        <div>
          <Navbar tasks={tasks} setFilteredTasks={setFilteredTasks} className='mx-auto p-4' />
          <h2 className="relative inset-5 m-auto w-max h-max text-cente text-2xl mx-auto font-bold mb-4">Add Your First Task</h2>
          <TaskForm updateTasks={updateTasks} tasks={tasks} />
        </div>
      ) : 
      (
        <>
          <Navbar tasks={tasks} setFilteredTasks={setFilteredTasks} className='mx-auto p-4' />
          <div className="container mx-20 p-4 ">
            <div className="tasks-section mt-8">
              <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
              <div className="flex flex-wrap">
                {upcomingTasks.map(task => (
                  <TaskItem key={task.id} task={task} updateTasks={updateTasks} tasks={tasks} />
                ))}
              </div>
            </div>
            <div className="tasks-section mt-8">
              <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
              <div className="flex flex-wrap">
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} updateTasks={updateTasks} tasks={tasks} />
                ))}
              </div>
            </div>
            <div className="tasks-section mt-8">
              <h2 className="text-2xl font-bold mb-4">Overdued Tasks</h2>
              <div className="flex flex-wrap">
                {overdueTasks.map(task => (
                  <TaskItem key={task.id} task={task} updateTasks={updateTasks} tasks={tasks} />
                ))}
              </div>
            </div>
          </div>
          <TaskForm updateTasks={updateTasks} tasks={tasks} />
        </>
      )};
    </div>
  );
};

export default Dashboard;
