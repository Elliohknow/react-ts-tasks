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
  // Delete Task
  const deleteTask = async (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // Archive Task
  const archiveTask = async (id: string) => {
    console.log("task archived", id);
  };
  // toggle reminder
  const toggleReminder = async (id: string) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, reminder: !task.reminder } : task;
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
