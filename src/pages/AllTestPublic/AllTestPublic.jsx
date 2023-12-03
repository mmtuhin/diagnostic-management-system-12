
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
        <div>
            {
                availabletests.map(test => <TestPublicCard key={test._id} test={test}></TestPublicCard>)
            }
        </div>
    );
};

export default AllTestPublic;