export default interface AuthContextType {
  currentUserId: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  checkLoggedIn: () => boolean;
}
