import apiClient from "./apiClient";
import { BlogResponse } from "../shared/types";
import { AxiosError } from "axios";
import { AppError } from "../helpers/AppError";
import { parseResponse, parseError } from "../helpers/utils";

async function getAllBlogs(page: number, searchText: string, authorId: string) {
  try {
    const res = await apiClient.get(
      `/api/blogs?page=${page}&search=${searchText}&authorId=${authorId}`,
    );
    return parseResponse<BlogResponse[]>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

async function getBlogById(blogId: string) {
  try {
    const res = await apiClient.get(`/api/blogs/${blogId}`);
    return parseResponse<BlogResponse>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
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

async function updateBlogById(id: string, title: string, description: string) {
  try {
    const res = await apiClient.patch(
      `api/blogs/${id}`,
      { title, description },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    return parseResponse(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

async function deleteBlogById(id: string) {
  try {
    const res = await apiClient.delete(`api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return parseResponse(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

async function likeBlogByBlogId(blogId: string) {
  try {
    const res = await apiClient.post(
      `api/blogs/${blogId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    return parseResponse(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

async function unlikeBlogByBlogId(blogId: string) {
  try {
    const res = await apiClient.delete(`api/blogs/${blogId}/like`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return parseResponse(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

async function createComment(blogId: string, content: string) {
  try {
    const res = await apiClient.post(
      `api/blogs/${blogId}/like`,
      { content: content },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    return parseResponse(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

export default {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
  likeBlogByBlogId,
  unlikeBlogByBlogId,
  createComment,
};
