import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useDistricts from "../../hooks/useDistricts";
import useUpazilas from "../../hooks/useUpazilas";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser, logOut } = useAuth();
  const navigate = useNavigate()
  const [districts] = useDistricts();
  const [upazilas] = useUpazilas();
  // console.log(upazilas);
  // console.log(districts);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleDistrictChange = (e) => {
    // console.log("District is: ", e.target.value);
    // setSelectedDistrictId(e.target.value);
    const selectedDistrict = districts.find(
      (district) => district.name === e.target.value
    );

    console.log(selectedDistrict.id);
    const selectedUp = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrict.id
    );
    setFilteredUpazilas(selectedUp);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = { image: data.profileImg[0] };
    // console.log(imageFile);
    try {
      await createUser(data.email, data.password).then((result) => {
        console.log(result.user);
      });
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
       console.log(res.data.data.display_url);
      await updateUser(data.name, res.data.data.display_url);


      const userInfo = {
        email: data.email,
        photoUrl: res.data.data.display_url,
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      };
      console.log(userInfo);
      await axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        if(res.data.insertedId){
          toast.success('User Created Successfully')
          navigate('/')
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/*User  Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/*User  Photo Link */}
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Image Link</span>
              </label>
              <input
                {...register("profileImg", { required: true })}
                type="text"
                placeholder="Image Url.."
                className="input input-bordered"
              />
              {errors.profileImg && (
                <span className="text-red-600">This field is required</span>
              )}
            </div> */}

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Upload profile image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                {...register("profileImg", { required: true })}
              />
              {errors.profileImg && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* Email Field */}
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
            {/* DIstricts and Upazilas section */}
            {/* <select {...register("district", { required: true })}>
              <option value="female">female</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select> */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Select District</span>
              </label>
              <select
                {...register("district", { required: true })}
                onChange={handleDistrictChange}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select...
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Upazilas */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Select Upazila</span>
              </label>
              <select
                {...register("upazila", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select...
                </option>
                {filteredUpazilas.map((up) => (
                  <option key={up.id} value={up.name}>
                    {up.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Group */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Select Blood Group</span>
              </label>
              <select
                {...register("bloodGroup", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select...
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* For Password */}
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
              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  placeholder="Re-type password"
                  className="input input-bordered"
                />
                {watch("confirmPassword") !== watch("password") ? (
                  <p>password not match</p>
                ) : (
                  <></>
                )}

                {errors.confirmPassword && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  Have an account? Login
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-primary"
                value="Submit"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
