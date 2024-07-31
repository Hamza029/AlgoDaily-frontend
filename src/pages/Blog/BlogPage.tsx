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
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { AppError } from "../../helpers/AppError";

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

  const isLoggedIn = checkLoggedIn();

  useEffect(() => {
    blogAPI
      .getBlogById(blogId!)
      .then((res) => {
        setBlog(() => res.data);
        setLikeState((prev) => ({ ...prev, likeCount: res.data.likes.length }));
        if (isLoggedIn) {
          blog?.likes.forEach((like) => {
            if (like.userId === currentUserId) {
              setLikeState({ ...likeState, hasLiked: true });
            }
          });
        }
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

  useEffect(() => {
    if (isLoggedIn) {
      blog?.likes.forEach((like) => {
        if (like.userId === currentUserId) {
          setLikeState({ ...likeState, hasLiked: true });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
              {blog?.comments.length}
            </div>
          </Tooltip>
          <Tooltip title="download">
            <div>
              <IconDownload
                className="cursor-pointer"
                // onClick={toggleDownloadModal}
              />
            </div>
          </Tooltip>
        </div>
        <div className="text-2xl w-full font-semibold">Comments:</div>
        <div className="flex flex-col gap-3 w-full">
          {blog?.comments.map((comment) => (
            <div key={comment.id} className="flex gap-2 w-full border-b-2 pb-3">
              <div className="font-semibold">{comment.username}:</div>
              <div className="text-gray-500">{comment.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
