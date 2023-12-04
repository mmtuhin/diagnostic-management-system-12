import SingleLink from "../../components/SharedComponents/SingleLink";
import useAdmin from "../useAdmin";
import useAuth from "../useAuth";


const useLinks = () => {
  const {user} = useAuth()
  const [isAdmin] = useAdmin()
    const links = (
        <>
          <SingleLink path={""} linkTitle={"Home"}></SingleLink>
          <SingleLink path={"availabletests"} linkTitle={"Available Tests"}></SingleLink>
          <SingleLink path={"blogs"} linkTitle={"Blogs"}></SingleLink>
          <SingleLink path={"doctors"} linkTitle={"Doctors"}></SingleLink>
          {/* <SingleLink path={"dashboard"} linkTitle={"Dashboard"}></SingleLink> */}
          {
            user && isAdmin && <SingleLink path={"dashboard/adminhome"} linkTitle={"Dashboard"}></SingleLink>
        }
        {
            user && !isAdmin && <SingleLink path={"dashboard/userhome"} linkTitle={"Dashboard"}></SingleLink>
        }
          
          {/* <SingleLink
            path={`myjobs/${user?.email}`}
            linkTitle={"My Jobs"}
          ></SingleLink>
          <SingleLink
            path={`appliedjobs/${user?.email}`}
            linkTitle={"Applied Jobs"}
          ></SingleLink> */}
        </>)
    return links
};

export default useLinks;