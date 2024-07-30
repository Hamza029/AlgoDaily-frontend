import { BlogResponse } from "../../shared/types";

export default interface BlogProps {
  blog: BlogResponse;
  currentUserId: string;
  isLoggedIn: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  fetchBlogs: () => void;
}
