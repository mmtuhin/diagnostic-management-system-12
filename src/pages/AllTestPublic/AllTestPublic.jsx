
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TestPublicCard from "./TestPublicCard/TestPublicCard";

const AllTestPublic = () => {
    const axiosSecure = useAxiosSecure()

    // The tests which is aailable from today to future day.
    const {data: availabletests =[], refetch} = useQuery({
        queryKey:['availabletests'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/availabletests');
            return res.data
        }
    })
    console.log(availabletests);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8">
            {
                availabletests.map(test => <TestPublicCard key={test._id} test={test}></TestPublicCard>)
            }
        </div>
    );
};

export default AllTestPublic;