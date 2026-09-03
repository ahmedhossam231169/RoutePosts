
import * as z from "zod";

export const registerSchema = z.object({
name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long").max(12, "Name must be at most 12 characters long"),
username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters long").max(12, "Username must be at most 12 characters long"),
email: z.email("Invalid email address").nonempty("Email is required"),
dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").nonempty("Date of birth is required").refine((value) => {
  const currentDate = new Date().getFullYear();
  const birthYear = new Date(value).getFullYear();
  const age = currentDate - birthYear;
  return age >= 18;

}, "age must be at least 18 years old"),
gender: z.string().nonempty("Gender is required"),
password: z.string().min(6, "Password must be at least 6 characters long"),
rePassword: z.string().min(6, "Password must be at least 6 characters long")
}).refine((data) => data.password === data.rePassword,  {
  message: "Passwords do not match",
  path: ["rePassword"]
}); 

export type RegisterSchema = z.infer<typeof registerSchema>;
