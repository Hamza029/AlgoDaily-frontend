import apiClient from "./apiClient";
import { BlogResponse } from "../shared/types";
import { AxiosError } from "axios";
import { AppError } from "../helpers/AppError";
import { parseResponse, parseError } from "../helpers/utils";

async function getAllBlogs(page: number) {
  try {
    const res = await apiClient.get(`/api/blogs?page=${page}`);
    return parseResponse<BlogResponse[]>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

export default {
  getAllBlogs,
};
