import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const UpcomingAppoinments = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const userEmail = user.email
    console.log(userEmail);
  const {
    data: appoinments = [],
    refetch,
  } = useQuery({
    queryKey: ["appoinments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reservations/${userEmail}`);
      return res.data;
    },
  });

  console.log(appoinments);
    return (
        <div>
            <h1>This is upcoming appoinments page</h1>
        </div>
    );
};

export default UpcomingAppoinments;