import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUpazilas = () => {
    const axiosPublic = useAxiosPublic();
    const {data: upazilas =[], isPending: loading} = useQuery({
        queryKey:['upazilas'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/upazila');
            return res.data
        }
    })

    return [upazilas, loading]
};

export default useUpazilas;