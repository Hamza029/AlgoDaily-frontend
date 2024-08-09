import Modal from "../Modal/Modal";
import JoinNowPromptProps from "./JoinNowPromptProps";
import Button from "../Button/Button";
import { BUTTON_COLOR, ROUTES } from "../../config/constants";
import { useNavigate } from "react-router-dom";

function JoinNowPrompt({ toggleJoinModal }: JoinNowPromptProps) {
  const navigate = useNavigate();

  return (
    <Modal handleClose={toggleJoinModal}>
      <div className="flex flex-col gap-3 p-10">
        <div className="font-semibold text-2xl mb-3">
          Join now to access this feature!
        </div>
        <Button
          color={BUTTON_COLOR.GRAY}
          handleClick={() => navigate(ROUTES.LOGIN)}
          wide={true}
          rounded={true}
        >
          Login
        </Button>
        <Button
          color={BUTTON_COLOR.BLACK}
          handleClick={() => navigate(ROUTES.SIGNUP)}
          wide={true}
          rounded={true}
        >
          Signup
        </Button>
      </div>
    </Modal>
  );
}

export default JoinNowPrompt;
