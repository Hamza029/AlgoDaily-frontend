import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import ModalProps from "./ModalProps";
import { IconXboxXFilled } from "@tabler/icons-react";

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

function Modal({ handleClose }: ModalProps) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className=" w-[90%] md:w-[600px] h-96 bg-white z-50 rounded-lg"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={handleClose}
        >
          <IconXboxXFilled />
        </button>
        <form action="" className="w[90%] px-10 py-10 text-lg">
          <div>
            <input
              type="text"
              className="border-2 border-gray-800 w-full rounded-lg mb-3 p-2"
              placeholder="Title..."
            />
          </div>
          <div>
            <textarea
              className="border-2 border-gray-800 resize-none w-full rounded-lg h-60 p-2"
              placeholder="Description..."
            />
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
