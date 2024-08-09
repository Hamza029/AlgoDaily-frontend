import * as Yup from "yup";

export interface BlogFormFields {
  title: string;
  description: string;
}

export const blogValidationSchema: Yup.ObjectSchema<BlogFormFields> =
  Yup.object({
    title: Yup.string().required().min(10).max(300),
    description: Yup.string().required().min(10).max(1500),
  });
