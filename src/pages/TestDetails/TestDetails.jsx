import { Link, useLoaderData } from "react-router-dom";

const TestDetails = ({ test }) => {
  const testData = useLoaderData();
  console.log(testData);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={testData.testImage}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-2xl font-bold">{testData.testName}</h1>
          <h1 className="text-lg font-semibold">Cost: $ {testData.cost}</h1>
          <h1 className="text-lg font-semibold">Available slots: {testData.slots}</h1>
          <h1 className="text-lg font-semibold">Available Date: {new Date(testData.testStartDate).toLocaleDateString()}</h1>

          <p className="py-6">
            {testData.details}
          </p>
          {testData.cost > 0 ? <Link to={`/dashboard/payment/${testData._id}`}>
                    <button className="btn btn-primary">Book Now</button>
                </Link>:
                <button disabled className="btn btn-primary">Book Now</button>
                }
          {/* <button className="btn btn-primary">Book Now</button> */}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
