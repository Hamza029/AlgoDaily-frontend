import { IconThumbUp, IconEdit } from "@tabler/icons-react";
import Button from "./../Button/Button";
import BlogProps from "./BlogProps";
import { AnimatePresence, motion } from "framer-motion";
import { CodeXml, Download, FileJson, FileText } from "lucide-react";
import { BUTTON_COLOR } from "../../config/constants";
import Modal from "../Modal/Modal";
import { useState } from "react";

function Blog({ blog, currentUserId }: BlogProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] =
    useState<boolean>(false);

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 p-7 w-80 md:w-[500px] lg:w-[480px] shadow-lg rounded-lg h-fit">
        <div className="text-2xl text-gray-800 font-semibold max-w-64 md:max-w-[420px] overflow-hidden text-wrap line-clamp-2">
          {blog.title}
        </div>
        <div className="text-md text-gray-600 border-b-2 w-full pb-1 font-semibold">
          Author: {blog.authorUsername}
        </div>
        <div className="text-lg text-gray-800 max-w-64 md:max-w-[420px] overflow-hidden text-wrap line-clamp-2">
          {blog.description}
        </div>
        <div>
          <Button color={BUTTON_COLOR.GRAY} handleClick={toggleDownloadModal}>
            <div className="flex gap-1 justify-center">
              Download <Download className="text-gray-700" />
            </div>
          </Button>
        </div>
        <div className="text-gray-800 flex gap-5 items-center">
          <div className="flex justify-center gap-1">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              <IconThumbUp className="cursor-pointer text-gray-700" />
            </motion.div>{" "}
            7
          </div>
          <div className="">7 comments</div>
          {currentUserId === blog.authorId && (
            <IconEdit className="cursor-pointer text-gray-700" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {isDownloadModalOpen && (
          <Modal handleClose={toggleDownloadModal}>
            <div className="flex flex-col gap-3 items-center w-64 h-64 p-7 text-lg">
              <div className="font-bold text-xl">Download as</div>
              <Button color={BUTTON_COLOR.GRAY} wide={true} rounded={false}>
                <div className="flex justify-center items-center gap-3">
                  Text <FileText />
                </div>
              </Button>
              <Button color={BUTTON_COLOR.GRAY} wide={true} rounded={false}>
                <div className="flex justify-center items-center gap-3">
                  JSON <FileJson />
                </div>
              </Button>
              <Button color={BUTTON_COLOR.GRAY} wide={true} rounded={false}>
                <div className="flex justify-center items-center gap-3">
                  XML <CodeXml />
                </div>
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Blog;
