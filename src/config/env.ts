import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname + "/../../.env");
dotenv.config({ path: envPath });

export default {
  SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
};
