import { IconContext } from "react-icons";

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick: (id: any) => Promise<void>;
}

const IconWrapper: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <IconContext.Provider value={{ className: className }}>
      <div onClick={onClick}>{children}</div>
    </IconContext.Provider>
  );
};
export default IconWrapper;
