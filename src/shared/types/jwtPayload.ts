import { UserRole } from "../../config/constants";

export default interface JWTPayload {
  Id: string;
  Username: string;
  Name: string;
  Role: UserRole;
  iat: number;
  exp: number;
}
