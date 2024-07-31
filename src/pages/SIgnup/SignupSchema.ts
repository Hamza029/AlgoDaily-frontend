import * as Yup from "yup";

export interface SignupFormFields {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validationSchema: Yup.ObjectSchema<SignupFormFields> = Yup.object({
  username: Yup.string()
    .trim()
    .required("This field is required")
    .matches(
      /^[a-z0-9]+$/,
      "Username can only contain lowercase letters and digits",
    )
    .min(1, "Username must have least one character")
    .max(20, "Username cannot exceed 20 characters"),
  name: Yup.string()
    .required("This field is required")
    .trim()
    .min(1, "Name must contain at least 1 character")
    .max(50, "Name cannot exceed 50 characters"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .min(4, "Password must have least 4 characters"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
