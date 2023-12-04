import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const UpcomingAppoinments = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const userEmail = user.email;
  console.log(userEmail);
  const { data: appoinments = [], refetch } = useQuery({
    queryKey: ["appoinments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/upcomingreservations/${userEmail}`);
      return res.data;
    },
  });

  const handleDeleteAppoinment = (id) => {
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
  };
  return (
    <div>
      <h1>Upcoming Appoinments: {appoinments.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Test Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {appoinments.map((appoinment, index) => (
              <tr key={appoinment._id}>
              <th>{index + 1}</th>
              <td>{appoinment.testName}</td>
              <td>{new Date(appoinment.date).toLocaleDateString()}</td>
              <td>$ {appoinment.amount / 100}</td>
              <td><button onClick={() => handleDeleteAppoinment(appoinment._id)}><AiFillDelete className="text-lg hover:cursor-pointer text-red-600"></AiFillDelete></button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingAppoinments;


