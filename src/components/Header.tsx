import Button from "./Button";

const Header = ({ title = "Some Tasks" }) => {
  const onClick = () => {
    console.log("Button Clicked!");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Add" onClick={onClick} />
    </header>
  );
};

export default Header;
