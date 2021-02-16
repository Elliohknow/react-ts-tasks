import { useLocation } from "react-router-dom";
import Button from "./Button";

interface Props {
  onAdd: any;
  showAddTask: any;
  title?: string;
}

const Header: React.FC<Props> = ({
  title = "Some Tasks",
  onAdd,
  showAddTask,
}) => {
  const location = useLocation();
  // const onClick = () => {
  //   console.log("Button Clicked!");
  // };

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

export default Header;
