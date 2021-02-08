import { Task } from "../App";

interface Props {
  tasks: Task[];
}

const TaskList = (props:Props) => {
  return (
    <>
      {
        props.tasks.map((task) => <h4 key={task.id}>{task.text}</h4>)
      }
    </>
  );
}
export default TaskList;