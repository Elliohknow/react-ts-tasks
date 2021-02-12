interface Props {
  color: string;
  text: string;
  onClick: any | null;
}
const Button = (props: Props) => {
  return (
    <button
      style={{ backgroundColor: props.color }}
      className="btn"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
