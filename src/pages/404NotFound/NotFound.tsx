import { Button } from "../../components";
import { BUTTON_COLOR } from "../../config/constants";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen mx-10">
      <div className="text-8xl font-bold">404</div>
      <img src="./../../../public/404.jpg" className="w-96 md:w-[40rem]" />
      <div className="text-3xl md:text-4xl font-semibold">
        Looks like you're lost
      </div>
      <div className="text-xl md:text-2xl text-center text-gray-500">
        The page you are looking for does not exist or has been removed or is
        temporarily unavailable!
      </div>
      <div className="mt-7">
        <Button color={BUTTON_COLOR.GRAY} handleClick={() => navigate("/")}>
          BACK TO HOMEPAGE
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
