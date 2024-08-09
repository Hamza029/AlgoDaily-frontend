import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormFields, validationSchema } from "./LoginSchema";
import { Button, Toast } from "../../components";
import { Link } from "react-router-dom";
import { BUTTON_COLOR, ROUTES } from "../../config/constants";
import authAPI from "../../api/authAPI";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import { AppError } from "../../helpers/AppError";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(validationSchema),
  });

  const { checkLoggedIn, setToken } = useContext(AuthContext);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const res = await authAPI.login(data);
      const newToken = res.data.token;
      setToken(() => newToken);
    } catch (err) {
      const appError = err as AppError;
      setLoginError(() => appError.message);
    }
  };

  const handleToastClose = () => {
    setLoginError(null);
  };

  return (
    <>
      {checkLoggedIn() && <Navigate to="/" replace={true} />}
      {loginError && (
        <Toast
          message={loginError}
          severity="error"
          handleToastClose={handleToastClose}
        />
      )}
      <p className="text-center mt-14 text-4xl font-bold text-gray-700">
        Login
      </p>
      <div className="flex justify-center mt-5">
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

            <div className="mb-7">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <div className="flex justify-center mb-7">
              <Button children="Login" color={BUTTON_COLOR.BLACK} />
            </div>
          </form>
          <div className="flex flex-col justify-center items-center lg:border-l-2 lg:pl-5">
            <p className="mb-3">Don't have an account?</p>
            <Link to={ROUTES.SIGNUP}>
              <Button
                children="Create a new account"
                color={BUTTON_COLOR.GRAY}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
