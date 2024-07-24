import ButtonProps from "./ButtonProps";

function Button({
  children,
  handleClick = () => {},
  color,
  rounded = true,
}: ButtonProps) {
  const textColor = color === "black" ? "text-white" : "text-gray-800";
  const buttonColor = color === "black" ? "bg-gray-800" : "bg-gray-200";
  const buttonColorHover =
    color === "black" ? "hover:bg-gray-700" : "hover:bg-gray-300";

  return (
    <>
      <button
        className={`px-3 py-2 ${rounded ? "rounded-3xl" : "rounded-sm"} font-medium ${textColor} ${buttonColor} ${buttonColorHover} duration-300`}
        onClick={handleClick}
        type="submit"
      >
        {children}
      </button>
    </>
  );
}

export default Button;
