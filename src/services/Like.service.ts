import axios from "axios";

export async function Like(postId:string) {
  const response = await axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
