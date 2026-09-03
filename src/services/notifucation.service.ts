import axios from "axios";

export async function getNotification() {
  const response = await axios.get(
    "https://route-posts.routemisr.com/notifications",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response.data;
}