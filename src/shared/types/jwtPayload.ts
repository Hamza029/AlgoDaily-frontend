import { UserRole } from "../../config/constants";

export default interface JWTPayload {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}
