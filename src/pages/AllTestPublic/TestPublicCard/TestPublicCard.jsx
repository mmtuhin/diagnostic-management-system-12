import { Link } from "react-router-dom";

const TestPublicCard = ({test}) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={test.testImage}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{test.testName}</h2>
        <p>{test.shortDescription}</p>
        <div className="card-actions">
          <button className="btn btn-sm w-full bg-[#04AA6D] text-white"><Link to={`testdetails/${test._id}`}>Details</Link></button>
        </div>
      </div>
    </div>
  );
};

export default TestPublicCard;
