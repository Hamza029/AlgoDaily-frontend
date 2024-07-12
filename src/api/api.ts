import axios, { AxiosInstance } from "axios";
import env from "../config/env";

export default class Api {
  private apiToken: string | null;

  apiEndpoint: string;

  constructor() {
    this.client = null;
    this.apiEndpoint = env.SERVER_URL;
  }
}
