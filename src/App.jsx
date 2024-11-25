import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todos");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [editTodo, setEditTodo] = useState(false);
  const [editTodoId, setEditTodoId] = useState();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    if (editTodo) {
      setTasks(
        tasks.map((todo) =>
          todo.id === editTodoId ? { ...todo, text: taskInput } : todo
        )
      );
      setEditTodo(false);
      setEditTodoId(null);
    } else {
      setTasks((prev) => [
        ...prev,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
    }

    setTaskInput("");
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTodo = (todo) => {
    setEditTodo(true);
    setTaskInput(todo.text);
    setEditTodoId(todo.id);
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="bg-[#0b0b30] min-h-screen text-white flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-md">
        <div className="flex items-center justify-between border border-[#6158dc] bg-[#1b1b50] p-4 rounded-lg shadow-md">
          <div>
            <h1 className="text-lg font-bold text-white">Todo work</h1>
            <p className="text-sm text-gray-400">Keep going!</p>
            <div className="w-full bg-[#262657] rounded-full h-2 mt-3">
              <div
                className="bg-[#6158dc] h-2 rounded-full"
                style={{
                  width: `${(completedCount / tasks.length) * 100 || 0}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="w-16 h-16 bg-[#6158dc] rounded-full flex items-center justify-center text-lg font-bold">
            {completedCount}/{tasks.length}
          </div>
        </div>

        <form onSubmit={handleAddTask} className="flex items-center gap-4 mt-8">
          <input
            type="text"
            placeholder="Write down the task"
            className="flex-grow p-3 bg-[#1b1b50] border border-[#6158dc] rounded-full text-white outline-none"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            type="submit"
            className="w-12 h-12 bg-[#6158dc] text-white rounded-full text-2xl font-bold flex items-center justify-center"
          >
            {editTodo ? <MdEdit /> : <IoMdAdd />}
          </button>
        </form>

        <ul className="mt-8 space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center bg-[#1b1b50] p-4 rounded-lg shadow-md ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <span className="flex-grow mx-4">{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 text-2xl"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => handleEditTodo(task)}
                className="text-blue-500 text-2xl ml-2"
              >
                <MdEdit />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
