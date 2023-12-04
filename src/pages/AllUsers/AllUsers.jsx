import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImBlocked } from "react-icons/im";
import { FaEye } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleBlockUser = (user) => {
    axiosSecure.patch(`/users/block/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is blocked Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleUserDetails =(user) => {
    const img = user.photoUrl;
    Swal.fire({
        title: user.name,
        text: user.email,
        html: `<p>District: ${user.district}</p><p>UpaZila: ${user.upazila}</p><p>Blood Group: ${user.bloodGroup}</p>`,
        imageUrl: img,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
  }

  const handleDeleteUser = (id) => {
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
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
      <h1>Total Users: {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              {/* <th>District</th> */}
              {/* <th>Upazila</th> */}
              {/* <th>Blood Group</th> */}
              <th>Status</th>
              <th>Role</th>
              <th>Details</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-sky-950 hover:text-white">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photoUrl} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                {/* <td>{user.district}</td> */}
                {/* <td>{user.upazila}</td> */}
                {/* <td>{user.bloodGroup}</td> */}
                <td>
                  {user.status === "active" ? (
                    <button 
                    onClick={() => handleBlockUser(user)}
                     className="btn btn-sm w-28">
                      <TiTick className="text-lg text-green-500"></TiTick>Active
                    </button>
                  ) : (
                    <button className="btn btn-sm w-28">
                      <ImBlocked className="text-lg text-red-600"></ImBlocked>
                      Blocked
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button className="btn btn-sm w-24">
                      <MdAdminPanelSettings className="text-lg text-amber-500"></MdAdminPanelSettings>
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm w-24"
                    >
                      <FaUser className="hover:cursor-pointer"></FaUser>
                      User
                    </button>
                  )}
                </td>
                <td><button
                onClick={() => handleUserDetails(user)}
                className="btn btn-sm w-28">
                      <FaEye className="text-lg text-sky-500"></FaEye>
                      See Info.
                    </button></td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <AiFillDelete className="text-lg hover:cursor-pointer text-red-600" />
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

export default AllUsers;
