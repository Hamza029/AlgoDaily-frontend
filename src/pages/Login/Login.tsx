import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormFields, validationSchema } from "./LoginSchema";
import { Button } from "../../components";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => console.log(data);

  return (
    <>
      <p className="text-center mt-14 text-4xl font-bold text-gray-700">
        Login
      </p>
      <div className="flex justify-center mt-5">
        <div className="px-7 py-7 shadow-xl rounded-lg lg:flex gap-10">
          <form className="w-72" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="username"
                {...register("username")}
              />
              <p className="text-red-500">{errors.username?.message}</p>
            </div>

            <div className="mb-7">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="password"
                type="password"
                {...register("password")}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <div className="flex justify-center mb-7">
              <Button text="Login" color="gray" />
            </div>
          </form>
          <div className="flex flex-col justify-center items-center lg:border-l-2 lg:pl-5">
            <p className="mb-3">Don't have an account?</p>
            <Link to="/signup">
              <Button text="Create a new account" color="white" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
