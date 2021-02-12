import { FaArchive, FaTrashAlt } from "react-icons/fa";
import { ITask } from "../App";

interface Props {
  task: ITask;
  onDelete: (id: any) => Promise<void>;
  onArchive: (id: any) => Promise<void>;
  onToggle: (id: any) => Promise<void>;
}

const Task = (props: Props) => {
  const { task, onDelete, onArchive, onToggle } = props;
  return (
    <div
      className={`task ${task.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaArchive
          style={{ color: "yellow", cursor: "pointer" }}
          onClick={() => onArchive(task.id)}
        />
        <FaTrashAlt
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
