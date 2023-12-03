import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTests = () => {
    const axiosSecure = useAxiosSecure()

    const {data: tests =[], refetch} = useQuery({
        queryKey:['tests'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/tests');
            return res.data
        }
    })

    return [tests, refetch]
};

export default useTests;