import { IconThumbUp } from "@tabler/icons-react";
import Button from "./../Button/Button";
import BlogProps from "./BlogProps";
import { motion } from "framer-motion";

function Blog({ blog }: BlogProps) {
  return (
    <div className="flex flex-col items-start gap-2 p-7 w-80 md:w-[500px] lg:w-[480px] shadow-lg rounded-lg">
      <div className="text-2xl text-gray-800 font-semibold">{blog.title}</div>
      <div className="text-md text-gray-600 border-b-2 w-full pb-1 font-semibold">
        Author: {blog.authorUsername}
      </div>
      <div className="text-lg text-gray-800">{blog.description}</div>
      <div>
        <Button color="white">Download</Button>
      </div>
      <div className="text-gray-800 flex gap-5 items-center">
        <div className="flex justify-center gap-1">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
          >
            <IconThumbUp className="cursor-pointer" />
          </motion.div>{" "}
          7
        </div>
        <div className="">7 comments</div>
      </div>
    </div>
  );
}

export default Blog;
