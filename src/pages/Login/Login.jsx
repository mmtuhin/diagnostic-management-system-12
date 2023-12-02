import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { useEffect } from "react";

const Login = () => {
  const [isAdmin] = useAdmin();
  const { user, login } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data.email, data.password)
      .then(() => {
        console.log("User", user);
        console.log("is Admin", isAdmin);
        console.log("Login Successful");
      })
      .catch((err) => console.log(err));
    // .then(data => console.log(data))
  };
  useEffect(() => {
    console.log("User", user);
    console.log("is Admin", isAdmin);
    if (user !== null && typeof isAdmin !== "undefined") {
      if (user && isAdmin) {
        navigate("/dashboard/adminhome");
      } else if (user && !isAdmin) {
        navigate("/dashboard/userhome");
      } else {
        navigate("/");
      }
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span>Minimum 6 character needed</span>
              )}
              <label className="label">
                <Link to="/signup" className="label-text-alt link link-hover">
                  New to Mediscan? Signup
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-primary"
                value="Login"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
