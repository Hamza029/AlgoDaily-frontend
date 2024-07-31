import { AxiosError } from "axios";
import { LoginFormFields } from "../pages/Login/LoginSchema";
import apiClient from "./apiClient";
import { parseResponse, parseError } from "../helpers/utils";
import { SignupFormFields } from "../pages/SIgnup/SignupSchema";
import { LoginResponse } from "../shared/types";
import { AppError } from "../helpers/AppError";

async function login(loginInputs: LoginFormFields) {
  try {
    const res = await apiClient.post("/api/auth/login", {
      username: loginInputs.username,
      password: loginInputs.password,
    });
    return parseResponse<LoginResponse>(res);
  } catch (err) {
    const errResponse = parseError(err as AxiosError);
    const appError = new AppError(errResponse.message, errResponse.status);
    throw appError;
  }
}

async function signup(inputs: SignupFormFields) {
  try {
    const res = await apiClient.post("/api/auth/signup", {
      username: inputs.username,
      email: inputs.email,
      name: inputs.name,
      password: inputs.password,
    });

    return parseResponse(res);
  } catch (err) {
    const errorResponse = parseError(err as AxiosError);
    const appError = new AppError(errorResponse.message, errorResponse.status);
    throw appError;
  }
}

async function updateMyPassword(currentPassword: string, newPassword: string) {
  try {
    console.log(currentPassword, newPassword);
    const res = await apiClient.patch(
      "/api/auth/password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    return parseResponse(res);
  } catch (err) {
    const errorResponse = parseError(err as AxiosError);
    const appError = new AppError(errorResponse.message, errorResponse.status);
    throw appError;
  }
}

export default {
  login,
  signup,
  updateMyPassword,
};
