import React from 'react';

const TaskItem = ({ task, updateTasks, tasks }) => {
  const removeTask = (taskId) => {
    const newTasks = tasks.filter(t => t.id !== taskId);
    updateTasks(newTasks);
  };

  const toggleComplete = (taskId) => {
    const newTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    updateTasks(newTasks);
  };

  const presentDay = new Date();
  const remaingTime = (task)=>{
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const rtinDays = new Date(task.dueDate) - presentDay;
    return Math.round(rtinDays/millisecondsInADay)
  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const isOverdued = (task) =>{
    return (!task.completed && new Date(task.dueDate) < presentDay);
  }

  return (
    <div className={`flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in gap-auto p-4 mt-6 mx-3 rounded-xl outline w-full md:w-1/5 max-w-6xl ${isOverdued(task)? 'bg-gray-300': task.priority === 'High' ? 'bg-red-100' : task.priority === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'} `}>
      <div className='mx-0'>
        <p className={`text-gray-700 font-bold text-2xl mx-0 text-left truncate w-60 mt-1 ${isOverdued(task)? 'line-through': ''} `}>{task.title}</p>
      </div>
      <div>
        <p className="w-60 text-gray-500 font-semibold text-xl text-left">
          {task.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[60px] flex justify-center items-center">
        <p className={`px-2 py-1 rounded-full text-white ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {task.priority}
        </p>
      </div>
      <div className="flex justify-center gap-12 items-center w-full mt-1">
        <div>
          <p className="text-green-600 text-[18px] font-semibold">Due Date - {formatDate(task.dueDate)}</p>
          <p className="text-green-600 text-[16px] font-semibold">{(remaingTime(task)>=0 && task.completed ) ? `Compeleted ${Math.abs(remaingTime(task))} days early`: (remaingTime(task)>=0 && !task.completed) ? `${remaingTime(task)} Days Remaining`: remaingTime(task)<0 && !task.completed ? `Overdue by ${Math.abs(remaingTime(task))} Days` : `Completed` } </p>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-between">
        <button
          className={`text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in ${task.completed ? 'bg-green-500' : ''}`}
          onClick={() => toggleComplete(task.id)}>
          {task.completed ? 'Completed' : 'Mark as Complete'}
        </button>
        <button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          onClick={() => removeTask(task.id)}>
          Remove Task
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
