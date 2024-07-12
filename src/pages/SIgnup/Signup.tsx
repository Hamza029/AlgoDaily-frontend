import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormFields, validationSchema } from "./SignupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { ROUTES } from "../../config/constants";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<SignupFormFields> = (data) => console.log(data);

  return (
    <>
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
                {...register("Username")}
              />
              <p className="text-red-500">{errors.Username?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Name"
                {...register("Name")}
              />
              <p className="text-red-500">{errors.Name?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Email"
                {...register("Email")}
              />
              <p className="text-red-500">{errors.Email?.message}</p>
            </div>

            <div className="mb-2">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Password"
                type="password"
                {...register("Password")}
              />
              <p className="text-red-500">{errors.Password?.message}</p>
            </div>

            <div className="mb-7">
              <input
                className="border-b-2 px-3 py-2 w-full focus:outline-none focus:border-gray-800"
                placeholder="Confirm Password"
                type="password"
                {...register("ConfirmPassword")}
              />
              <p className="text-red-500">{errors.ConfirmPassword?.message}</p>
            </div>

            <div className="flex justify-center mb-7">
              <Button children="Signup" color="black" />
            </div>
          </form>

          <div className="flex flex-col justify-center items-center lg:border-l-2 lg:pl-5">
            <p className="mb-3">Already have an account?</p>
            <Button color="white">
              <Link to={ROUTES.LOGIN}>Login instead</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
