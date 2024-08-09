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
import { downloadBlog, formatDate } from "../../helpers/utils";
import { BlogFormFields, blogValidationSchema } from "../../shared/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import JoinNowPrompt from "../JoinNowPrompt/JoinNowPrompt";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [likeState, setLikeState] = useState<{
    likeCount: number;
    hasLiked: boolean;
  }>({
    likeCount: blog.likes.length,
    hasLiked: false,
  });
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const toggleJoinModal = () => {
    setIsJoinModalOpen((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormFields>({
    resolver: yupResolver(blogValidationSchema),
  });

  const onBlogSubmit: SubmitHandler<BlogFormFields> = (data) => {
    setUpdating(true);
    blogAPI
      .updateBlogById(blog.id, data.title, data.description)
      .then((res) => {
        setSuccess(res.message);
        fetchBlogs();
      })
      .catch((err) => {
        setError((err as AppError).message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const onDelete = () => {
    setDeleting(true);
    blogAPI
      .deleteBlogById(blog.id)
      .then((res) => {
        setSuccess(res.message);
        fetchBlogs();
      })
      .catch((err) => {
        setError((err as AppError).message);
      })
      .finally(() => {
        setDeleting(false);
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
    } else {
      toggleJoinModal();
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
        <div className="text-md text-gray-600 w-full pb-1">
          Posted at: {formatDate(blog.createdAt)}
        </div>
        <div className="text-md text-gray-600 border-b-2 w-full pb-1 font-semibold flex gap-1">
          Author:
          <Link to={`/profile/${blog.authorId}`} className="hover:underline">
            {blog.authorUsername}
          </Link>
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
                  onClick={toggleDeleteModal}
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
              className="w-[350px] md:w-[600px] px-10 py-7 text-lg"
              onSubmit={handleSubmit(onBlogSubmit)}
            >
              <div>
                <p className="text-red-500">{errors.title?.message}</p>
                <input
                  type="text"
                  className="border-2 border-gray-500 w-full rounded-lg mb-3 p-2"
                  placeholder="Title..."
                  defaultValue={blog.title}
                  {...register("title")}
                />
              </div>
              <div>
                <p className="text-red-500">{errors.description?.message}</p>
                <textarea
                  className="border-2 border-gray-500 resize-none w-full rounded-lg h-52 p-2"
                  placeholder="Description..."
                  defaultValue={blog.description}
                  {...register("description")}
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button color={BUTTON_COLOR.GREEN} isLoading={updating}>
                  Update
                </Button>
              </div>
            </form>
          </Modal>
        )}
        {isDeleteModalOpen && (
          <Modal handleClose={toggleDeleteModal}>
            <div className="w-72 p-7 flex flex-col items-center gap-3">
              <div className="text-center font-semibold">
                Are you sure?
                <br />
                This action cannot be undone
              </div>
              <Button
                color={BUTTON_COLOR.GRAY}
                rounded={false}
                wide={true}
                handleClick={toggleDeleteModal}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                color={BUTTON_COLOR.RED}
                rounded={false}
                wide={true}
                handleClick={onDelete}
                isLoading={deleting}
              >
                Delete
              </Button>
            </div>
          </Modal>
        )}
        {isJoinModalOpen && <JoinNowPrompt toggleJoinModal={toggleJoinModal} />}
      </AnimatePresence>
    </>
  );
}

export default Blog;
