import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BlogFormFields,
  BlogResponse,
  blogValidationSchema,
} from "../../shared/types";
import { useContext, useEffect, useState } from "react";
import blogAPI from "../../api/blogAPI";
import { CircularProgress, Tooltip } from "@mui/material";
import {
  IconThumbUpFilled,
  IconThumbUp,
  IconMessageCircle,
  IconDownload,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { AppError } from "../../helpers/AppError";
import { Button, Modal, Toast } from "../../components";
import { BUTTON_COLOR, CONTENT_TYPE } from "../../config/constants";
import userAPI from "../../api/userAPI";
import { CodeXml, FileJson, FileText } from "lucide-react";
import { downloadBlog, formatDate, timeAgo } from "../../helpers/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CommentInfo {
  userId: string;
  content: string;
  username: string;
  createdAt: Date;
}

function Blog() {
  const { blogId } = useParams();

  const [blog, setBlog] = useState<BlogResponse | null>();
  const { checkLoggedIn, currentUserId } = useContext(AuthContext);
  const [likeState, setLikeState] = useState<{
    likeCount: number;
    hasLiked: boolean;
  }>({
    likeCount: 0,
    hasLiked: false,
  });
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const isLoggedIn = checkLoggedIn();

  useEffect(() => {
    setLoading((_p) => true);
    blogAPI
      .getBlogById(blogId!)
      .then((res) => {
        if (isLoggedIn) {
          res.data!.likes.forEach((like) => {
            if (like.userId === currentUserId) {
              setLikeState({ ...likeState, hasLiked: true });
            }
          });
        }
        setBlog(() => res.data);
        setLikeState((prev) => ({ ...prev, likeCount: res.data.likes.length }));
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading((_p) => false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeClick = () => {
    if (isLoggedIn) {
      if (!likeState.hasLiked) {
        blogAPI
          .likeBlogByBlogId(blog!.id)
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
          .unlikeBlogByBlogId(blog!.id)
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

  const onCommentSubmit = () => {
    (async () => {
      try {
        await blogAPI.createComment(blog!.id, newComment);
        const currentUserRes = await userAPI.getUserById(currentUserId!);
        const currentUser = currentUserRes.data;
        const currentComment: CommentInfo = {
          userId: currentUser.id,
          username: currentUser.username,
          createdAt: new Date(),
          content: newComment,
        };
        setComments((prev) => [...prev, currentComment]);
        setNewComment("");
      } catch (err) {
        setError((err as AppError).message);
      }
    })();
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormFields>({
    resolver: yupResolver(blogValidationSchema),
  });

  const onBlogSubmit: SubmitHandler<BlogFormFields> = (data) => {
    blogAPI
      .updateBlogById(blogId!, data.title, data.description)
      .then((res) => {
        setSuccess(res.message);
        setBlog((prev) => ({
          ...prev!,
          title: data.title,
          description: data.description,
        }));
      })
      .catch((err) => {
        setError((err as AppError).message);
      });
  };

  const onDelete = () => {
    blogAPI
      .deleteBlogById(blogId!)
      .then((_res) => {
        navigate("/");
      })
      .catch((err) => {
        setError((err as AppError).message);
      });
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <>
      {error && (
        <Toast
          message={error}
          severity="error"
          handleToastClose={() => setError("")}
        />
      )}
      {success && (
        <Toast
          message={success}
          severity="success"
          handleToastClose={() => setSuccess("")}
        />
      )}
      {!blog || loading ? (
        <div className="w-full flex justify-center mt-20">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center mt-10 text-gray-900">
            <div className="flex flex-col gap-7 w-[85%] md:w-[400px] lg:w-[650px]">
              <div className="text-4xl font-bold">{blog.title}</div>
              <div className="text-sm text-gray-500 pb-2">
                Posted at: {formatDate(blog.createdAt)}
              </div>
              <div className="text-lg font-bold text-gray-700 border-b-2">
                Author:{" "}
                <Link
                  to={`/profile/${blog.authorId}`}
                  className="hover:underline"
                >
                  {blog?.authorUsername}
                </Link>
              </div>
              <div className="text-lg">{blog.description}</div>
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
                    <IconMessageCircle className="inline-block cursor-pointer" />{" "}
                    {comments.length}
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
              {comments.length > 0 && (
                <div className="text-2xl w-full font-semibold">Comments:</div>
              )}
              <div id="comments-section" className="flex flex-col gap-3 w-full">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex gap-2 w-full border-b-2 pb-3"
                  >
                    <div className="font-semibold">
                      <Link
                        to={`/profile/${comment.userId}`}
                        className="hover:underline"
                      >
                        {comment.username}
                      </Link>
                      :
                    </div>
                    <div className="text-gray-500 ml-3">
                      <div>{comment.content}</div>
                      <div className="text-sm mt-2 text-gray-700">
                        {timeAgo(comment.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isLoggedIn && (
                <div>
                  <textarea
                    required
                    className="border-2 border-gray-500 resize-none w-full rounded-lg h-30 p-2 mb-2"
                    placeholder="Share your opinion..."
                    value={newComment}
                    onChange={(e) => setNewComment(() => e.target.value)}
                  />
                  <Button
                    color={BUTTON_COLOR.GREEN}
                    handleClick={onCommentSubmit}
                  >
                    Add comment
                  </Button>
                </div>
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
                    handleClick={downloadBlog(CONTENT_TYPE.TEXT, blog!.id)}
                  >
                    <div className="flex justify-center items-center gap-3">
                      Text <FileText />
                    </div>
                  </Button>
                  <Button
                    color={BUTTON_COLOR.GRAY}
                    wide={true}
                    rounded={false}
                    handleClick={downloadBlog(CONTENT_TYPE.JSON, blog!.id)}
                  >
                    <div className="flex justify-center items-center gap-3">
                      JSON <FileJson />
                    </div>
                  </Button>
                  <Button
                    color={BUTTON_COLOR.GRAY}
                    wide={true}
                    rounded={false}
                    handleClick={downloadBlog(CONTENT_TYPE.XML, blog!.id)}
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
                    <p className="text-red-500">
                      {errors.description?.message}
                    </p>
                    <textarea
                      className="border-2 border-gray-500 resize-none w-full rounded-lg h-52 p-2"
                      placeholder="Description..."
                      defaultValue={blog.description}
                      {...register("description")}
                    />
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button color={BUTTON_COLOR.GREEN}>Submit</Button>
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
                  >
                    Cancel
                  </Button>
                  <Button
                    color={BUTTON_COLOR.RED}
                    rounded={false}
                    wide={true}
                    handleClick={onDelete}
                  >
                    Delete
                  </Button>
                </div>
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default Blog;
