import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormFields, validationSchema } from "./SignupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate } from "react-router-dom";
import { Button, Toast } from "../../components";
import { BUTTON_COLOR, ROUTES } from "../../config/constants";
import authAPI from "../../api/authAPI";
import { AppError } from "../../helpers/AppError";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

function Signup() {
  const { checkLoggedIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>({ resolver: yupResolver(validationSchema) });

  const [signupError, setSignupError] = useState<string | null>(null);
  const [singupSuccessful, setSignupSuccessful] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      setLoading(true);
      const res = await authAPI.signup(data);
      setSignupSuccessful(() => res.message);
    } catch (err) {
      const appError = err as AppError;
      setSignupError(() => appError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {checkLoggedIn() && <Navigate to="/" replace={true} />}

      {signupError && (
        <Toast
          message={signupError}
          severity="error"
          handleToastClose={() => setSignupError(null)}
        />
      )}

      {singupSuccessful && (
        <Toast
          message={singupSuccessful}
          severity="success"
          handleToastClose={() => setSignupSuccessful(null)}
        />
      )}

      <p className="text-center mt-14 text-4xl font-bold text-gray-700">
        Create a new account!
      </p>
      <div className="flex justify-center mt-5 pb-20">
        <div className="px-7 py-7 shadow-xl rounded-lg lg:flex gap-10">
          <form className="w-72" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Username"
                {...register("username")}
              />
              <p className="text-red-500">{errors.username?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Name"
                {...register("name")}
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Email"
                {...register("email")}
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <div className="mb-7">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword")}
              />
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            </div>

            <div className="flex justify-center mb-7">
              <Button color={BUTTON_COLOR.BLACK} isLoading={loading}>
                Signup
              </Button>
            </div>
          </form>

          <div className="flex flex-col justify-center items-center lg:border-l-2 lg:pl-5">
            <p className="mb-3">Already have an account?</p>
            <Button color={BUTTON_COLOR.GRAY}>
              <Link to={ROUTES.LOGIN}>Login instead</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
