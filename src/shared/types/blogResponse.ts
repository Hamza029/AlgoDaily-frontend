export interface LikeResponse {
  id: string;
  blogId: string;
  userId: string;
  username: string;
}

export interface CommentResponse {
  id: string;
  blogId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

export interface CommentResponseList {
  totalComments: number;
  comments: CommentResponse[];
}

export default interface BlogResponse {
  id: string;
  authorId: string;
  title: string;
  description: string;
  authorUsername: string;
  createdAt: Date;
  likes: LikeResponse[];
  commentsCount: number;
}

export interface BlogResponseList {
  totalPages: number;
  blogs: BlogResponse[];
}
