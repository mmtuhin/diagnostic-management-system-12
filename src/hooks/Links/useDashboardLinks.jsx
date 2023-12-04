import SingleLink from "../../components/SharedComponents/SingleLink";
import { FaHome } from "react-icons/fa";
import useAdmin from "../useAdmin";



const useDashboardLinks = () => {
  const [isAdmin] = useAdmin()
    const links = isAdmin? <>
      <SingleLink path={"dashboard/adminhome"} linkTitle={"Admin Home"}><FaHome className="text-lg mr-2" /></SingleLink>
      <SingleLink path={'dashboard/allusers'} linkTitle={'All users'}></SingleLink>
      <SingleLink path={'dashboard/addtest'} linkTitle={'Add a Test'}></SingleLink>
      <SingleLink path={'dashboard/alltest'} linkTitle={'All Tests'}></SingleLink>
      <SingleLink path={'dashboard/addbanner'} linkTitle={'Add Banner'}></SingleLink>
      <SingleLink path={'dashboard/allbanners'} linkTitle={'All Banners'}></SingleLink>
      <div className="divider"></div>
      <SingleLink path={""} linkTitle={"Site Home"}><FaHome className="text-lg mr-2" /></SingleLink>

      {/* <SingleLink
        path={`myjobs/${user?.email}`}
        linkTitle={"My Jobs"}
      ></SingleLink>
      <SingleLink
        path={`appliedjobs/${user?.email}`}
        linkTitle={"Applied Jobs"}
      ></SingleLink> */}
</>
: <>
<SingleLink path={"dashboard/userhome"} linkTitle={"Dashboard"}></SingleLink>
<SingleLink path={"dashboard/upcomingappoinments"} linkTitle={"Upcoming Appoinments"}></SingleLink>
<SingleLink path={"dashboard/testresults"} linkTitle={"Test Results"}></SingleLink>
<SingleLink path={"dashboard/myprofile"} linkTitle={"My Profile"}></SingleLink>
<div className="divider"></div>
<SingleLink path={""} linkTitle={"Site Home"}><FaHome className="text-lg mr-2" /></SingleLink>
</>

    return links
};

export default useDashboardLinks;