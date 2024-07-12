export default interface ButtonProps {
  children: string | React.JSX.Element | React.JSX.Element[];
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: "black" | "white";
}
