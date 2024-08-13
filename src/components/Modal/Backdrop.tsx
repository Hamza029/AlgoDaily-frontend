import { motion } from "framer-motion";
import BackdropProps from "./BackdropProps";

function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <motion.div
      className="bg-black bg-opacity-50 flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-20"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
