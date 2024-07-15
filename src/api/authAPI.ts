import { AxiosError } from "axios";
import { LoginFormFields } from "../pages/Login/LoginSchema";
import apiClient from "./apiClient";
import { parseResponse, parseError } from "../helpers/utils";

async function login(loginInputs: LoginFormFields) {
  try {
    const res = await apiClient.post("/api/auth/login", {
      Username: loginInputs.Username,
      Password: loginInputs.Password,
    });

    return parseResponse(res);
  } catch (err) {
    return parseError(err as AxiosError);
  }
}

export default {
  login,
};
