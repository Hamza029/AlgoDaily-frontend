import { jwtDecode } from "jwt-decode";
import JWTPayload from "../shared/types/jwtPayload";
import { AxiosResponse, AxiosError } from "axios";
import APIResponse from "../shared/types/apiRespose";
import blogAPI from "../api/blogAPI";
import { CONTENT_TYPE } from "../config/constants";
import { format, formatDistanceToNow } from "date-fns";

export const getUserIdFromToken = (authToken: string | null): string | null => {
  if (!authToken || authToken === "") {
    return null;
  }

  try {
    const id = (jwtDecode(authToken) as JWTPayload).id;
    return id;
  } catch (err) {
    return null;
  }
};

export const checkIfTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const payload: JWTPayload = jwtDecode(token) as JWTPayload;
    const currentTime = Date.now() / 1000;
    if (currentTime <= payload.exp) {
      return true;
    }
  } catch (err) {
    return false;
  }

  return false;
};

export const parseResponse = <T>(res: AxiosResponse) => {
  const { data, status } = res;

  const response: APIResponse<T> = {
    status,
    message: data.message,
    data: data.data,
  };

  return response;
};

export const parseError = (err: AxiosError) => {
  const errResponse: APIResponse<null> = {
    status: err.response?.status || 500,
    message: err.response?.data
      ? (err.response.data as APIResponse<null>).message
      : "something went wrong",
    data: null,
  };

  return errResponse;
};

export const downloadBlog =
  (contentType: CONTENT_TYPE, blogId: string) => () => {
    (async () => {
      try {
        let blob: Blob = new Blob();

        // Create a blob with the data we want to download as a file
        if (contentType === CONTENT_TYPE.TEXT) {
          const res = await blogAPI.getBlogAsTextById(blogId);
          blob = new Blob([res], { type: CONTENT_TYPE.TEXT });
        } else if (contentType === CONTENT_TYPE.JSON) {
          const res = await blogAPI.getBlogById(blogId);
          blob = new Blob([JSON.stringify(res)], { type: CONTENT_TYPE.JSON });
        } else {
          const res = await blogAPI.getBlogAsXMLById(blogId);
          blob = new Blob([res], { type: CONTENT_TYPE.XML });
        }

        // Create an anchor element and dispatch a click event on it to trigger a download
        const a = document.createElement("a");
        a.download = `blog_${blogId}`;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
      } catch (err) {
        console.log(err);
      }
    })();
  };

export const timeAgo = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDate = (date: Date) => {
  return format(date, "MMMM dd, yyyy h:mm a");
};
