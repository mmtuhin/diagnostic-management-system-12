import { Link } from "react-router-dom";

const TestPublicCard = ({test}) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={test.testImage}
          alt="testImage"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-center">{test.testName}</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <h1>Available Date: {new Date(test.testStartDate).toLocaleDateString()}</h1>
          <h1>Slots: {test.slots}</h1>
        </div>
        <div>
          
        </div>
        <p>{test.shortDescription}</p>
        <div className="card-actions">
          <button className="btn btn-sm w-full bg-[#04AA6D] text-white"><Link to={`/testdetails/${test._id}`}>Details</Link></button>
        </div>
      </div>
    </div>
  );
};

export default TestPublicCard;
