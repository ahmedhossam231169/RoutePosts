import axios from "axios";
import type { RegisterSchema } from "../lib/schema/auht.schema";

export async function registerUser(data: RegisterSchema) {
  const response = await axios.post("https://route-posts.routemisr.com/users/signup", data);
  return response.data;
}