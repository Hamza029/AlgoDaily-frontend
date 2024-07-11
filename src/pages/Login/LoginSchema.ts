import * as Yup from "yup";

export interface LoginFormFields {
  username: string;
  password: string;
}

export const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
