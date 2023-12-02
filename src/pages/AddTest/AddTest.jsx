import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddTest = () => {
  const axiosSecure = useAxiosSecure();
  // const today = new Date()
  // const [dates, setDates] = useState([today])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleAddTest = async (data) => {
    // console.log(dates);
    await axiosSecure.post("/tests", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Test is added successfully!");
      }
    });
  };
  return (
    <div>
      <h1 className="text-center text-2xl">Please insert test details</h1>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-grow-0 w-full  shadow-2xl bg-base-100">
            {/* Form Starts */}
            <form onSubmit={handleSubmit(handleAddTest)} className="card-body">
              {/* First Row */}
              <div className="flex gap-8">
                <div className="form-control flex-grow">
                  <label className="label">
                    <span className="label-text">Test Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("testName", { required: true })}
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* <DatePicker multiple value={dates} onChange={setDates} /> */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Available date</span>
                  </label>
                  <input
                    type="date"
                    {...register("testStartDate", {
                      required: true,
                      valueAsDate: true,
                    })}
                    placeholder="Date"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image Link</span>
                </label>
                <input
                  type="text"
                  {...register("testImage", { required: true })}
                  placeholder="Image URL...."
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Another Row */}
              <div className="flex gap-8">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Test Cost</span>
                  </label>
                  <input
                    type="number"
                    {...register("cost", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Price"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Slots Per Day</span>
                  </label>
                  <input
                    type="number"
                    {...register("slots", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Slots"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Availability</span>
                </div>
                <select
                  {...register("availability", { required: true })}
                  className="select select-bordered"
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  <option value="available">Available</option>
                  <option value="notAvailable">Not Available</option>
                </select>
              </label>
              <div className="form-control">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Short Description</span>
                  </div>
                  <textarea
                    type="textarea"
                    {...register("shortDescription", {
                      required: true,
                    })}
                    className="textarea textarea-bordered h-24"
                    placeholder="Bio"
                  ></textarea>
                </label>
              </div>
              {/* Details */}
              <div className="form-control">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Details</span>
                  </div>
                  <textarea
                    type="textarea"
                    {...register("details", {
                      required: true,
                    })}
                    className="textarea textarea-bordered h-24"
                    placeholder="Details"
                  ></textarea>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary uppercase"
                  value="submit"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTest;
