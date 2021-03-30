import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { formatDateTime } from "./utils";

export interface ITask {
  id: number | string;
  text: string;
  date: string;
  reminder: boolean;
}

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 2,
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
  const fetchTasks = async (): Promise<any> => {
    const result = await fetch("http://localhost:5050/tasks");
    const data = await result.json();
    return data;
  };
  // Fetch a single task
  const fetchTask = async (id: number | string): Promise<any> => {
    const result = await fetch(`http://localhost:5050/tasks/${id}`);
    const data = await result.json();
    return data;
  };
  // Add Task
  const addTask = async (task: ITask): Promise<void> => {
    // const newTask = { ...task, id: UUID() };
    // setTasks([...tasks, newTask]);
    const result = await fetch("http://localhost:5050/tasks", {
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
  const deleteTask = async (id: number | string): Promise<void> => {
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // toggle reminder
  const toggleReminder = async (id: number | string): Promise<void> => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const result = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
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
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <TaskList
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "Task list is currently empty."
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}
