import { HTTPStatusCode } from "../config/constants";

export class AppError extends Error {
  status: HTTPStatusCode;

  constructor(message: string, status: HTTPStatusCode) {
    super(message);
    this.status = status;
  }
}
