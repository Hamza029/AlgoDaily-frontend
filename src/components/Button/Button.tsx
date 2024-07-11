interface ButtonProps {
  text: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: "gray" | "white";
}

function Button({ text, handleClick = () => {}, color }: ButtonProps) {
  const textColor = color === "gray" ? "text-white" : "text-gray-800";
  const buttonColor = color === "gray" ? "bg-gray-800" : "bg-gray-200";
  const buttonColorHover =
    color === "gray" ? "hover:bg-gray-700" : "hover:bg-gray-300";

  return (
    <>
      <button
        className={`px-3 py-2 rounded-3xl font-medium ${textColor} ${buttonColor} ${buttonColorHover} duration-300`}
        onClick={handleClick}
        type="submit"
      >
        {text}
      </button>
    </>
  );
}

export default Button;
