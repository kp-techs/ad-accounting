import { object, ref, string } from "yup";

export const validationNewUserForm = object({
  name:string().required("Favor introducir nombre de usuario."),
  password:string().required("Favor introducir contraseña."),
  confirmPassword:string().required("Favor reescribir su contraseña.").oneOf([ref("password")],'La contraseñas introducidas no coinciden'),
});