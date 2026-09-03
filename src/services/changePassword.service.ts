import axios from "axios";

export async function changePassword  (formData:FormData) {
  const response = await axios.patch(
    `https://route-posts.routemisr.com/users/change-password`,
    {
  "password": formData.get("password"),
  "newPassword": formData.get("newPassword")
},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
  return response;
}