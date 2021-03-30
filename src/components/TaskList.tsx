import { ITask } from "../App";
import Task from "./Task";

interface Props {
  tasks: ITask[];
  onDelete: (id: any) => Promise<void>;
  onToggle: (id: any) => Promise<void>;
}

const TaskList = (props: Props) => {
  const { tasks, onDelete, onToggle } = props;
  return (
    <>
      {tasks.map((task) => (
        <h4 key={task.id}>
          <Task task={task} onDelete={onDelete} onToggle={onToggle} />
        </h4>
      ))}
    </>
  );
};
export default TaskList;
