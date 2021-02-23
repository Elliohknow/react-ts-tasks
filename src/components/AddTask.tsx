import { useState } from "react";

interface Props {
  onAdd: (task: any) => Promise<void>;
}
const AddTask: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!text) {
      alert("Please include the name of the task");
      return;
    }

    onAdd({ text, date, reminder });

    setText("");
    setDate("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input
          type="text"
          placeholder="Add Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-control form-control-checked">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={`${reminder}`}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
