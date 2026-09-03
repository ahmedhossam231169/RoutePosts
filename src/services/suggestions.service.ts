import axios from "axios";

export async function getSuggestions() {
  const response = await axios.get(
    "https://route-posts.routemisr.com/users/suggestions?limit=50",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}