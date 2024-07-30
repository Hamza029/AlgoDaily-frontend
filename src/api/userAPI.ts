import apiClient from "./apiClient";
import { UserResponse } from "../shared/types";
import { AxiosError } from "axios";
import { AppError } from "../helpers/AppError";
import { parseResponse, parseError } from "../helpers/utils";

async function getUserById(userId: string) {
  try {
    const res = await apiClient.get(`/api/users/${userId}`);
    return parseResponse<UserResponse>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

async function updateUserById(userId: string, name: string) {
  try {
    const res = await apiClient.patch(
      `/api/users/${userId}`,
      { Name: name },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    return parseResponse<UserResponse>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

export default { getUserById, updateUserById };
