import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://mediscan-diagnostic-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 