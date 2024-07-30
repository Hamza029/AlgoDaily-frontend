import { useState } from "react";
import { IconPasswordUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Button, Toast } from "./../../components";
import { BUTTON_COLOR } from "../../config/constants";
import * as Yup from "yup";
import authAPI from "../../api/authAPI";
import { AppError } from "../../helpers/AppError";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface PassworUpdateFormFileds {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const validationSchema: Yup.ObjectSchema<PassworUpdateFormFileds> = Yup.object({
  currentPassword: Yup.string().required("This field is required"),
  newPassword: Yup.string()
    .required("This field is required")
    .min(4, "Password must have least 4 characters"),
  confirmNewPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

function PasswordUpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassworUpdateFormFileds>({
    resolver: yupResolver(validationSchema),
  });

  const [passwordUpdateError, setPasswordUpdateError] = useState<string | null>(
    null,
  );
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState<
    string | null
  >(null);

  const onSubmit: SubmitHandler<PassworUpdateFormFileds> = async (data) => {
    try {
      const res = await authAPI.updateMyPassword(
        data.currentPassword,
        data.newPassword,
      );
      setPasswordUpdateSuccess(() => res.message);
    } catch (err) {
      const appError = err as AppError;
      setPasswordUpdateError(() => appError.message);
    }
  };

  return (
    <>
      {passwordUpdateError && (
        <Toast
          message={passwordUpdateError}
          severity="error"
          handleToastClose={() => setPasswordUpdateError(null)}
        />
      )}

      {passwordUpdateSuccess && (
        <Toast
          message={passwordUpdateSuccess}
          severity="success"
          handleToastClose={() => setPasswordUpdateSuccess(null)}
        />
      )}

      <motion.div
        className="flex flex-col gap-5 justify-center items-center w-full mt-10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex flex-col items-center justify-center">
          <IconPasswordUser className="h-16 w-16 md:w-24 md:h-24" />
          <div className="text-xl font-bold">Change Password</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <form className="w-72" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Current password"
                type="password"
                {...register("currentPassword")}
              />
              <p className="text-red-500">{errors.currentPassword?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="New password"
                type="password"
                {...register("newPassword")}
              />
              <p className="text-red-500">{errors.newPassword?.message}</p>
            </div>

            <div className="mb-7">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Confirm new password"
                type="password"
                {...register("confirmNewPassword")}
              />
              <p className="text-red-500">
                {errors.confirmNewPassword?.message}
              </p>
            </div>

            <div className="flex justify-center mb-7">
              <Button color={BUTTON_COLOR.GREEN}>Update Password</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default PasswordUpdateForm;
