import { BUTTON_COLOR } from "../../config/constants";

export default interface ButtonProps {
  children: string | React.JSX.Element | React.JSX.Element[];
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: BUTTON_COLOR;
  rounded?: boolean;
  wide?: boolean;
  disabled?: boolean;
}
