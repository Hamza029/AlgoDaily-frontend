import { CircularProgress } from "@mui/material";
import { BUTTON_COLOR } from "../../config/constants";
import ButtonProps from "./ButtonProps";

function Button({
  children,
  handleClick = () => {},
  color,
  rounded = true,
  wide = false,
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  let textColor;
  let buttonColor;
  let buttonColorHover;

  switch (color) {
    case BUTTON_COLOR.BLACK:
      textColor = "text-white";
      buttonColor = "bg-gray-800";
      buttonColorHover = "hover:bg-gray-700";
      break;

    case BUTTON_COLOR.GRAY:
      textColor = "text-gray-800";
      buttonColor = "bg-gray-200";
      buttonColorHover = "hover:bg-gray-300";
      break;

    case BUTTON_COLOR.GREEN:
      textColor = "text-white";
      buttonColor = "bg-green-700";
      buttonColorHover = "hover:bg-green-800";
      break;

    case BUTTON_COLOR.RED:
      textColor = "text-white";
      buttonColor = "bg-red-700";
      buttonColorHover = "hover:bg-red-800";
      break;
  }

  return (
    <>
      <button
        className={`px-3 py-2 relative ${rounded ? "rounded-3xl" : "rounded-sm"} ${wide ? "w-full" : ""} font-medium ${textColor} ${buttonColor} ${buttonColorHover}`}
        onClick={handleClick}
        type="submit"
        disabled={isLoading || disabled}
      >
        <div>
          {children}
          {isLoading && (
            <div
              className={`absolute top-0 left-0 bg-gray-300 ${rounded ? "rounded-3xl" : "rounded-sm"} bg-opacity-50 w-full h-full flex justify-center items-center`}
            >
              <CircularProgress size={25} thickness={7} />
            </div>
          )}
        </div>
      </button>
    </>
  );
}

export default Button;
