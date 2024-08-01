import { useParams } from "react-router-dom";
import { BlogResponse } from "../../shared/types";
import { useContext, useEffect, useState } from "react";
import blogAPI from "../../api/blogAPI";
import { Tooltip } from "@mui/material";
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
import { Button, Modal } from "../../components";
import { BUTTON_COLOR, CONTENT_TYPE } from "../../config/constants";
import userAPI from "../../api/userAPI";
import { CodeXml, FileJson, FileText } from "lucide-react";
import { downloadBlog } from "../../helpers/utils";

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
  const [isDownloadModalOpen, setIsDownloadModalOpen] =
    useState<boolean>(false);

  const isLoggedIn = checkLoggedIn();

  useEffect(() => {
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
        console.log(err);
      }
    })();
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 text-gray-900">
        <div className="flex flex-col gap-7 w-[85%] md:w-[400px] lg:w-[650px]">
          <div className="text-4xl font-bold">{blog?.title}</div>
          <div className="text-lg font-bold text-gray-700 border-b-2 pb-2">
            Author: {blog?.authorUsername}
          </div>
          <div className="text-lg">{blog?.description}</div>
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
            {isLoggedIn && currentUserId === blog?.authorId && (
              <>
                <Tooltip title="edit">
                  <IconEdit
                    className="cursor-pointer"
                    // onClick={toggleEditModal}
                  />
                </Tooltip>
                <Tooltip title="delete">
                  <IconTrash
                    className="cursor-pointer text-red-700"
                    // onClick={onDelete}
                  />
                </Tooltip>
              </>
            )}
          </div>
          <div className="text-2xl w-full font-semibold">Comments:</div>
          <div id="comments-section" className="flex flex-col gap-3 w-full">
            {comments.map((comment, index) => (
              <div key={index} className="flex gap-2 w-full border-b-2 pb-3">
                <div className="font-semibold">{comment.username}:</div>
                <div className="text-gray-500">{comment.content}</div>
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
              <Button color={BUTTON_COLOR.GREEN} handleClick={onCommentSubmit}>
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
    </>
  );
}

export default Blog;
