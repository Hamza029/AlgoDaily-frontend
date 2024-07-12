import * as Yup from "yup";

export interface LoginFormFields {
  Username: string;
  Password: string;
}

export const validationSchema: Yup.ObjectSchema<LoginFormFields> = Yup.object({
  Username: Yup.string().required(),
  Password: Yup.string().required(),
});
