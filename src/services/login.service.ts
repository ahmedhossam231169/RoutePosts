import axios from "axios";
import type { LoginSchema } from "../lib/schema/lognin.schema";


export async function loginUser(data: LoginSchema) {
  const loginResponse = await axios.post("https://route-posts.routemisr.com/users/signin", data);
  return loginResponse.data;
}