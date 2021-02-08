import { useState } from 'react';
import { formatDateTime, UUID } from './utils';
export interface Task {
  id: string;
  text: string;
  date: string;
  reminder: boolean;
}

function App() {
  const [tasks, setTasks] = useState([
    {
      id: UUID(),
      text: 'Test Task',
      date: formatDateTime(),
      reminder: true
    },
  ]);
  return (
    <div className="App">
      <h1>Hello there</h1>
    </div>
  );
}

export default App;
