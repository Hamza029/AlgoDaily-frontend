import apiClient from "./apiClient";
import { BlogResponse } from "../shared/types";
import { AxiosError } from "axios";
import { AppError } from "../helpers/AppError";
import { parseResponse, parseError } from "../helpers/utils";

async function getAllBlogs(page: number, searchText: string) {
  try {
    const res = await apiClient.get(
      `/api/blogs?page=${page}&search=${searchText}`,
    );
    return parseResponse<BlogResponse[]>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

async function createBlog(title: string, description: string) {
  try {
    const res = await apiClient.post(
      "api/blogs",
      { title: title, description: description },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    return parseResponse(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

export default {
  getAllBlogs,
  createBlog,
};
