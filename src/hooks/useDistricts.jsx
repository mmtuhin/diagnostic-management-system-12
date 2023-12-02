import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useDistricts = () => {
    const axiosPublic = useAxiosPublic();
    const {data: districts =[], isPending: loading} = useQuery({
        queryKey:['districts'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/district');
            return res.data
        }
    })

    return [districts, loading]
};

export default useDistricts;