import {
  IconThumbUp,
  IconThumbUpFilled,
  IconEdit,
  IconMessageCircle,
  IconTrash,
  IconDownload,
} from "@tabler/icons-react";
import Button from "./../Button/Button";
import BlogProps from "./BlogProps";
import { AnimatePresence, motion } from "framer-motion";
import { CodeXml, FileJson, FileText } from "lucide-react";
import { BUTTON_COLOR, CONTENT_TYPE } from "../../config/constants";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import blogAPI from "../../api/blogAPI";
import { AppError } from "../../helpers/AppError";
import { Link } from "react-router-dom";
import { downloadBlog } from "../../helpers/utils";

function Blog({
  blog,
  currentUserId,
  isLoggedIn,
  setError,
  setSuccess,
  fetchBlogs,
}: BlogProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(blog.title);
  const [descriptionInput, setDescriptionInput] = useState<string>(
    blog.description,
  );
  const [likeState, setLikeState] = useState<{
    likeCount: number;
    hasLiked: boolean;
  }>({
    likeCount: blog.likes.length,
    hasLiked: false,
  });

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const onBlogSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    blogAPI
      .updateBlogById(blog.id, titleInput, descriptionInput)
      .then((res) => {
        setSuccess(res.message);
        fetchBlogs();
      })
      .catch((err) => {
        setError((err as AppError).message);
      });
  };

  const onDelete = () => {
    blogAPI
      .deleteBlogById(blog.id)
      .then((res) => {
        setSuccess(res.message);
        fetchBlogs();
      })
      .catch((err) => {
        setError((err as AppError).message);
      });
  };

  const onLikeClick = () => {
    if (isLoggedIn) {
      if (!likeState.hasLiked) {
        blogAPI
          .likeBlogByBlogId(blog.id)
          .then((_res) => {
            setLikeState((prev) => ({
              likeCount: prev.likeCount + 1,
              hasLiked: true,
            }));
          })
          .catch((err) => {
            console.log((err as AppError).message);
          });
      } else {
        blogAPI
          .unlikeBlogByBlogId(blog.id)
          .then((_res) => {
            setLikeState((prev) => ({
              likeCount: prev.likeCount - 1,
              hasLiked: false,
            }));
          })
          .catch((err) => {
            console.log((err as AppError).message);
          });
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      blog.likes.forEach((like) => {
        if (like.userId === currentUserId) {
          setLikeState({ ...likeState, hasLiked: true });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col items-start gap-3 p-7 w-80 md:w-[500px] lg:w-[480px] shadow-lg rounded-lg border-2 border-gray-50">
        <div className="text-2xl text-gray-800 font-semibold max-w-64 md:max-w-[420px] overflow-hidden text-wrap line-clamp-2">
          <Link
            to={`/blog/${blog.id}`}
            className="hover:underline duration-300"
          >
            {blog.title}
          </Link>
        </div>
        <div className="text-md text-gray-600 border-b-2 w-full pb-1 font-semibold">
          Author: {blog.authorUsername}
        </div>
        <div className="text-lg text-gray-800 max-w-64 md:max-w-[420px] overflow-hidden text-wrap line-clamp-2">
          {blog.description}
        </div>
        <div className="text-gray-700 flex gap-7 items-center w-full">
          <Tooltip
            title={`${isLoggedIn && likeState.hasLiked ? "unlike" : "like"}`}
          >
            <div className="flex justify-center gap-1">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={onLikeClick}
              >
                {isLoggedIn && likeState.hasLiked ? (
                  <IconThumbUpFilled className="cursor-pointer" />
                ) : (
                  <IconThumbUp className="cursor-pointer" />
                )}
              </motion.div>
              {likeState.likeCount}
            </div>
          </Tooltip>
          <Tooltip title="comments">
            <div className="">
              <Link to={`/blog/${blog.id}`}>
                <IconMessageCircle className="inline-block cursor-pointer" />{" "}
                {blog.comments.length}
              </Link>
            </div>
          </Tooltip>
          <Tooltip title="download">
            <div>
              <IconDownload
                className="cursor-pointer"
                onClick={toggleDownloadModal}
              />
            </div>
          </Tooltip>
          {isLoggedIn && currentUserId === blog.authorId && (
            <>
              <Tooltip title="edit">
                <IconEdit
                  className="cursor-pointer"
                  onClick={toggleEditModal}
                />
              </Tooltip>
              <Tooltip title="delete">
                <IconTrash
                  className="cursor-pointer text-red-700"
                  onClick={onDelete}
                />
              </Tooltip>
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isDownloadModalOpen && (
          <Modal handleClose={toggleDownloadModal}>
            <div className="flex flex-col gap-3 items-center w-64 h-64 p-7 text-lg">
              <div className="font-bold text-xl">Download as</div>
              <Button
                color={BUTTON_COLOR.GRAY}
                wide={true}
                rounded={false}
                handleClick={downloadBlog(CONTENT_TYPE.TEXT, blog.id)}
              >
                <div className="flex justify-center items-center gap-3">
                  Text <FileText />
                </div>
              </Button>
              <Button
                color={BUTTON_COLOR.GRAY}
                wide={true}
                rounded={false}
                handleClick={downloadBlog(CONTENT_TYPE.JSON, blog.id)}
              >
                <div className="flex justify-center items-center gap-3">
                  JSON <FileJson />
                </div>
              </Button>
              <Button
                color={BUTTON_COLOR.GRAY}
                wide={true}
                rounded={false}
                handleClick={downloadBlog(CONTENT_TYPE.XML, blog.id)}
              >
                <div className="flex justify-center items-center gap-3">
                  XML <CodeXml />
                </div>
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isEditModalOpen && (
          <Modal handleClose={toggleEditModal}>
            <form
              action=""
              className="w-[350px] md:w-[600px] h-96 p-10 text-lg"
            >
              <div>
                <input
                  required
                  type="text"
                  className="border-2 border-gray-500 w-full rounded-lg mb-3 p-2"
                  placeholder="Title..."
                  value={titleInput}
                  onChange={(e) => setTitleInput(() => e.target.value)}
                />
              </div>
              <div>
                <textarea
                  required
                  className="border-2 border-gray-500 resize-none w-full rounded-lg h-52 p-2"
                  placeholder="Description..."
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(() => e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button color={BUTTON_COLOR.GREEN} handleClick={onBlogSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Blog;
