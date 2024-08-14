import { useCallback, useEffect, useState } from "react";
import blogAPI from "../api/blogAPI";
import { AppError } from "../helpers/AppError";
import { CommentInfo } from "../shared/types";

interface IUseFetchComments {
  blogId: string;
}

function useFetchComments({ blogId }: IUseFetchComments) {
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [commentsError, setCommentsError] = useState<string>("");

  const fetchMoreComments = useCallback(() => {
    setCommentsLoading(true);
    console.log(comments.length);
    blogAPI
      .getCommentsByBlogId(blogId, comments.length, 5)
      .then((res) => res.data)
      .then((data) => {
        setComments((prev) => [...prev, ...data.comments]);
        setTotalComments((_p) => data.totalComments);
        console.log(comments);
      })
      .catch((err) => {
        setCommentsError((err as AppError).message);
      })
      .finally(() => {
        setCommentsLoading(false);
      });
  }, [comments]);

  useEffect(() => {
    fetchMoreComments();
  }, []);

  return {
    comments,
    setComments,
    commentsLoading,
    commentsError,
    setCommentsError,
    totalComments,
    setTotalComments,
    fetchMoreComments,
  };
}

export default useFetchComments;
