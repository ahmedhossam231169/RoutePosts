import axios from "axios";

export async function getAllPosts(id:string) {
  const response = await axios.get(
    `https://route-posts.routemisr.com/users/${id}/posts`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}