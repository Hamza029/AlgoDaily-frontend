import apiClient from "./apiClient";
import { BlogResponse, BlogResponseList } from "../shared/types";
import { AxiosError } from "axios";
import { AppError } from "../helpers/AppError";
import { parseResponse, parseError } from "../helpers/utils";
import { CONTENT_TYPE, HTTPStatusCode } from "../config/constants";

// const sleep = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

async function getAllBlogs(page: number, searchText: string, authorId: string) {
  try {
    const res = await apiClient.get(
      `/api/blogs?page=${page}&search=${searchText}&authorId=${authorId}`,
    );
    return parseResponse<BlogResponseList>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

async function getBlogById(blogId: string) {
  try {
    // await sleep(2000);
    const res = await apiClient.get(`/api/blogs/${blogId}`);
    return parseResponse<BlogResponse>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    throw new AppError(errResponse.message, errResponse.status);
  }
}

async function getBlogAsTextById(blogId: string) {
  try {
    const res = await apiClient.get(`/api/blogs/${blogId}`, {
      headers: { Accept: CONTENT_TYPE.TEXT },
    });
    const data: string = res.data;
    return data;
  } catch (err) {
    throw new AppError(
      "Something went wrong",
      HTTPStatusCode.InternalServerError,
    );
  }
}

async function getBlogAsXMLById(blogId: string) {
  try {
    const res = await apiClient.get(`/api/blogs/${blogId}`, {
      headers: { Accept: CONTENT_TYPE.XML },
    });
    const data = res.data;
    return data;
  } catch (err) {
    throw new AppError(
      "Something went wrong",
      HTTPStatusCode.InternalServerError,
    );
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
      `api/blogs/${blogId}/comment`,
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
  getBlogAsTextById,
  getBlogAsXMLById,
  createBlog,
  updateBlogById,
  deleteBlogById,
  likeBlogByBlogId,
  unlikeBlogByBlogId,
  createComment,
};
