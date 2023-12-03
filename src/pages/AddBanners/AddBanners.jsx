import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddBanners = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddBanner = async (data) => {
    console.log(data);
    // console.log("Banner added success");
    await axiosSecure.post("/banners", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Banner added successfully!");
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-2xl">Please insert banner details</h1>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-grow-0 w-full shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleAddBanner)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Banner Name</span>
                </label>
                <input
                  type="text"
                  {...register("bannerName", { required: true })}
                  placeholder="Banner Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Banner Image</span>
                </label>
                <input
                  type="text"
                  {...register("bannerImage", { required: true })}
                  placeholder="Banner Image URL...."
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="flex gap-8">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Coupon Code Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("couponCodeName", { required: true })}
                    placeholder="Coupon Code Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Coupon Code Rate</span>
                  </label>
                  <input
                    type="number"
                    {...register("couponCodeRate", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Coupon Code Rate"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered h-24"
                  placeholder="Description"
                  required
                ></textarea>
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary uppercase"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanners;
