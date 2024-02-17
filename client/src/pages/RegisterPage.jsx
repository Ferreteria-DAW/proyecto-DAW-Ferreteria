import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((err, i) => {
          <div className=" bg-red-500 p-2 text-white" key={i}>
            {err}
          </div>;
        })}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="username"
          />
          {errors.username && (
            <p className="text-red-500">username is required</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my2"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className=" text-white border-cyan-50 border py-3 px-5 bg-blue-400 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          Already have an account?{" "}
          <Link className=" text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
