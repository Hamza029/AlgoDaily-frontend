import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import ModalProps from "./ModalProps";
import { IconX } from "@tabler/icons-react";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 100,
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function Modal({ children, handleClose }: ModalProps) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="absolute top-2 right-2 text-red-700 rounded-full p-1 hover:rotate-90 hover:bg-gray-200 duration-200"
          onClick={handleClose}
        >
          <IconX />
        </button>
        {children}
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
