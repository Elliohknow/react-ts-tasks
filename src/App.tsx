import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { formatDateTime, UUID } from "./utils";

export interface ITask {
  id: string;
  text: string;
  date: string;
  reminder: boolean;
}

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: UUID(),
      text: "Test Task",
      date: formatDateTime(),
      reminder: true,
    },
  ]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    const result = await fetch("http://localhost:5050/tasks");
    const data = await result.json();
    return data;
  };
  // Fetch a single task
  const fetchTask = async (id: string) => {
    const result = await fetch(`http://localhost:5050/tasks/${id}`);
    const data = await result.json();
    return data;
  };
  // Add Task
  const addTask = async (task: ITask) => {
    const result = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await result.json();

    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // Archive Task
  const archiveTask = async (id: string) => {
    console.log("task archived", id);
  };
  // toggle reminder
  const toggleReminder = async (id: string) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const result = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await result.json();

    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, reminder: data.reminder } : task;
      })
    );
  };

  return (
    <Router>
      <div className="App">
        <Header />
        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onArchive={archiveTask}
            onToggle={toggleReminder}
          />
        ) : (
          "Task list is currently empty."
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
