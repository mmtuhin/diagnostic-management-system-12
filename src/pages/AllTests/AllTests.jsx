import useTests from "../../hooks/useTests";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTests = () => {
 const axiosSecure = useAxiosSecure()

  const [tests, refetch] = useTests();
  console.log(tests);

  const handleDeleteTest =(id) => {
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
          axiosSecure.delete(`/tests/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  }

  return (
    <div>
      <h1>This is all Tests Page</h1>
      <h1>Total Tests:{tests.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead className="text-center">
            <tr >
              <th></th>
              <th>Test Name</th>
              <th>Available date</th>
              <th>Cost</th>
              <th>Reservations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
                tests.map((test,index) =>  <tr key={test._id}>
                <th>{index}</th>
                <td>{test.testName}</td>
                <td>{new Date(test.testStartDate).toLocaleDateString()}</td>
                <td>$ {test.cost}</td>
                <td className="text-center"><button><FaCalendarCheck className="text-lg hover:cursor-pointer text-green-600"></FaCalendarCheck></button></td>
                <td>
                    <button className="mr-4"><FaEdit className="text-lg hover:cursor-pointer text-sky-600"></FaEdit></button>
                    <button onClick={() => handleDeleteTest(test._id)}><AiFillDelete className="text-lg hover:cursor-pointer text-red-600"></AiFillDelete></button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTests;
