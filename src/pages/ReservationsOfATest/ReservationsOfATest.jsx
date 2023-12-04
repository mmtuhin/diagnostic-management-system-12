import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReservationsOfATest = () => {
  const reservedTestsLoader = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [reservedTests, setReservedTests] = useState(reservedTestsLoader);
  const [pdfLinks, setPdfLinks] = useState({}); // State to hold PDF links for each row

  const [query, setQuery] = useState("");
  //   console.log(query);
  //   console.log(reservedTests);

  const handlePDFSubmission =async (id, pdfLink) => {
    // You can perform an action here with the submitted PDF link, e.g., save it to the server.
    // Use the `id` to identify the row for which the link is being submitted.
    console.log(`Submitting PDF link for row with ID ${id}: ${pdfLink}`);
    const res = await axiosSecure.patch(`/reservations/${id}`, {pdfLink})
    console.log(res.data);
  };

  const handleDeleteReservation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reservations/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Reservation has been deleted.",
              icon: "success",
            });
            const remaining = reservedTests.filter((tests) => tests._id !== id);
            setReservedTests(remaining);
          }
        });
      }
    });
  };

  return (
    <div>
      <h1>
        Reservations of {reservedTests[0]?.testName} : {reservedTests?.length}
      </h1>
      <div className="form-control w-full max-w-xs pl-4">
        <label className="label">
          <span className="label-text">Search reservation by email</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-sm input-bordered rounded-xl font-semibold w-full max-w-xs mb-4"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto mb-8 px-4">
        <table className="table table-xs">
          <thead>
            <tr className="bg-[#383b47] text-white">
              <th></th>
              <th>Test Name</th>
              <th>Reserved By</th>
              <th>Paid Amount</th>
              {/* <th>Payment Date</th> */}
              <th>Report Status</th>
              <th>Submit Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservedTests
              .filter((test) =>
                test.email.toLowerCase().includes(query.toLowerCase())
              )
              .map((userTest, index) => (
                <tr
                  key={userTest._id}
                  className="hover:bg-[#cccccc] dark:hover:bg-[#27334e]"
                >
                  <th>{index + 1}</th>
                  <td>{userTest.testName}</td>
                  <td>{userTest.email}</td>
                  <td>$ {userTest.amount / 100}</td>
                  {/* <td>{myjob.jobLocation}</td> */}
                  {/* <td>{new Date(userTest.date).toLocaleDateString()}</td> */}
                  {userTest.reportStatus === 'done'?<td className="uppercase">Delivered</td>
                  : <td className="uppercase">Pending</td>
                   }
                  
                  <td className="text-center pl-6">
                    {
                        userTest?.pdfLink? <h1>Done</h1>
                        : <>
                                            <input
                      type="text"
                      placeholder="PDF Link"
                      value={pdfLinks[userTest._id] || ""}
                      onChange={(e) => {
                        const updatedLinks = { ...pdfLinks };
                        updatedLinks[userTest._id] = e.target.value;
                        setPdfLinks(updatedLinks);
                      }}
                    />
                    <button
                      onClick={() =>
                        handlePDFSubmission(
                          userTest._id,
                          pdfLinks[userTest._id]
                        )
                      }
                    >
                      Submit PDF
                    </button></>
                    }
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteReservation(userTest._id)}
                    >
                      <AiFillDelete className="text-lg hover:cursor-pointer text-red-600"></AiFillDelete>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsOfATest;
