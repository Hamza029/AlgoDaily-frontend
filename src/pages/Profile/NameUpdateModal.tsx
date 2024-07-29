import { useState } from "react";
import { BUTTON_COLOR } from "../../config/constants";
import { Button, Toast } from "./../../components";
import { Modal } from "./../../components";
import uesrAPI from "../../api/userAPI";
import { AppError } from "../../helpers/AppError";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  fetchCurrentUser: () => Promise<void>;
}

function NameUpdateModal({
  setModalOpen,
  userId,
  fetchCurrentUser,
}: ModalProps) {
  const [nameInput, setNameInput] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNameInput(() => e.target.value);
  }

  function handleNameUpdate() {
    uesrAPI
      .updateUserById(userId, nameInput)
      .then((res) => {
        setSuccess(() => res.message);
        setError(() => null);
        fetchCurrentUser();
      })
      .catch((err) => {
        setError(() => (err as AppError).message);
        setSuccess(() => null);
      });
  }

  return (
    <>
      {error && (
        <Toast
          message={error}
          severity="error"
          handleToastClose={() => setError(null)}
        />
      )}
      {success && (
        <Toast
          message={success}
          severity="success"
          handleToastClose={() => setSuccess(null)}
        />
      )}
      <Modal handleClose={() => setModalOpen(() => false)}>
        <div className="px-7 py-10 flex flex-col items-center gap-5">
          <input
            className="w-56 px-3 py-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-700"
            type="text"
            placeholder="Name"
            onChange={handleNameInput}
            required
          />
          <div>
            <Button color={BUTTON_COLOR.GREEN} handleClick={handleNameUpdate}>
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NameUpdateModal;
