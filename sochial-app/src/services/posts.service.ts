import axios from "axios";

export async function getNewsFeed() {
  const response = await axios.get(
    "https://route-posts.routemisr.com/posts/feed?only=following&limit=10",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
export async function getCommunity
() {
  const response = await axios.get(
    "https://route-posts.routemisr.com/posts",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
export async function CreatePost(formdata:FormData) {
  const response = await axios.post(
    "https://route-posts.routemisr.com/posts",formdata,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
export async function UpdatePost(id: string, formdata: FormData) {
  const response = await axios.put(
    `https://route-posts.routemisr.com/posts/${id}`,
    formdata,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
  export async function DeletePost(id: string) {
    const response = await axios.delete(
      `https://route-posts.routemisr.com/posts/${id}`,
      
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}
