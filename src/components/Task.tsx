import { FaTrashAlt } from "react-icons/fa";
import { ITask } from "../App";
import IconWrapper from "./IconWrapper";

interface Props {
  task: ITask;
  onDelete: (id: any) => Promise<void>;
  onToggle: (id: any) => Promise<void>;
}

const Task: React.FC<Props> = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <div className="icons">
          <IconWrapper
            children={<FaTrashAlt />}
            className="icon trash"
            onClick={() => onDelete(task.id)}
          />
        </div>
      </h3>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
