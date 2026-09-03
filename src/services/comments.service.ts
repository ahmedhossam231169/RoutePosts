import axios from "axios";

export async function getComments(postId:string) {
  const response = await axios.get(
    `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
export async function cereateComment(postId:string, formData:FormData) {
  const response = await axios.post(
    `https://route-posts.routemisr.com/posts/${postId}/comments`,formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
export async function updateComment(postId:string, commentId:string, formData:FormData) {
  const response = await axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
export async function deleteComment(postId:string, commentId:string, ) {
  const response = await axios.delete(
    `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
