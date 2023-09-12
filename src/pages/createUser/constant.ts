import { object, ref, string } from "yup";

export const validationNewUserForm = object({
  name:string().required("Please, introduce a user name."),
  password:string().required("Please, type a new password."),
  confirmPassword:string().required("Please, re-type a new password.").oneOf([ref("password")],'Passwords do not match, try again.'),
});