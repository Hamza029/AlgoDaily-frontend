import { jwtDecode } from "jwt-decode";
import JWTPayload from "../shared/types/jwtPayload";
import { AxiosResponse, AxiosError } from "axios";
import APIResponse from "../shared/types/apiRespose";

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
