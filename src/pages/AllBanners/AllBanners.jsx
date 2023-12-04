
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TiTick } from "react-icons/ti";
import { ImBlocked } from "react-icons/im";


const AllBanners = () => {
  const axiosSecure = useAxiosSecure();
  const {data: banners =[], refetch} = useQuery({
    queryKey:['banners'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/banners');
        return res.data
    }
})
  console.log(banners);

  const handleDeleteBanner = (id) => {
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
        axiosSecure.delete(`/banners/${id}`).then((res) => {
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

  const handleMakeActive = async (id) => {
    try {
        // Make a PATCH request to activate a specific banner
        const response = await axiosSecure.patch(`/banners/activate/${id}`);
    
        if (response.status === 200) {
          console.log('Banner activated successfully');
          refetch()
          // Perform any additional actions upon successful activation
        }
      } catch (error) {
        console.error('Error activating banner:', error);
        // Handle errors or display error messages
      }
  }

  return (
    <div>
      <h1>This is all Banners Page</h1>
      <h1>Total Banners: {banners.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead className="text-center">
            <tr>
              <th></th>
              <th>Banner Name</th>
              <th>Banner Image</th>
              <th>Title</th>
              <th>Coupon Code Name</th>
              <th>Coupon Code Rate</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {banners.map((banner, index) => (
              <tr key={banner._id}>
                <th>{index+1}</th>
                <td>{banner.bannerName}</td>
                <td>{banner.bannerImage}</td>
                <td>{banner.title}</td>
                <td>{banner.couponCodeName}</td>
                <td>{banner.couponCodeRate}</td>
                <td>
                {banner.isActive === true ? (
                    <button 
                    
                     className="btn btn-sm w-36">
                      <TiTick className="text-lg text-green-500"></TiTick>Active
                    </button>
                  ) : (
                    <button onClick={() => handleMakeActive(banner._id)} className="btn btn-sm w-36 text-sm">
                      <ImBlocked className="text-lg text-red-600"></ImBlocked>
                      Make Active
                    </button>
                  )}
                </td>
                <td className="flex">
                  <button className="mr-2">
                    <FaEdit className="text-lg hover:cursor-pointer text-sky-600"></FaEdit>
                  </button>
                  <button onClick={() => handleDeleteBanner(banner._id)}>
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

export default AllBanners;
