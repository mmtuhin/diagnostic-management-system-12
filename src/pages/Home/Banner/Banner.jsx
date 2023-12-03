import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: activeBanner = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners/active");
      return res.data;
    },
  });
  console.log(activeBanner);
  const bannerImg = activeBanner[0]?.bannerImage
  console.log(bannerImg);
  return (
    <div
      className="hero h-72 "
      style={{
        backgroundImage:
          `url(${bannerImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl font-bold text-[#9cdfb8] drop-shadow">
            {activeBanner[0]?.title}
          </h1>
          <p className="mb-5">
          {activeBanner[0]?.description}
          </p>
          <div >
            <div>
              <div>
                <span className="fonr-semibold">Apply Promo </span><span className="px-1 bg-amber-600 text-black rounded-md font-semibold">{activeBanner[0]?.couponCodeName}</span>
              </div>
            </div>
            <div className="indicator mt-2">
              <Link to='/availabletests'><button className="btn btn-sm px-4 py-2 text-white btn-success bg-[#059862]">All Tests</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
