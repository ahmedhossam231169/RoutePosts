import axios from "axios";

export async function getSinglePost(postId:string) {
  const response = await axios.get(
    `https://route-posts.routemisr.com/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
