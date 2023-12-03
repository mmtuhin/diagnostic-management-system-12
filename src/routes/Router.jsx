import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../layouts/Dashboard/Dashboard";
import AllTests from "../pages/AllTests/AllTests";
import AllUsers from "../pages/AllUsers/AllUsers";
import AddTest from "../pages/AddTest/AddTest";
import Reservations from "../pages/Reservations/Reservations";
import AddBanners from "../pages/AddBanners/AddBanners";
import AllBanners from "../pages/AllBanners/AllBanners";
import UpcomingAppoinments from "../pages/UpcomingAppointments/UpcomingAppoinments";
import TestResults from "../pages/TestResults/TestResults";
import MyProfile from "../pages/MyProfile/MyProfile";
import PrivateRouter from "./PrivateRouter";
import UserHome from "../pages/UserHome/UserHome";
import AdminHome from "../pages/AdminHome/AdminHome";
import AllTestPublic from "../pages/AllTestPublic/AllTestPublic";
import TestDetails from "../pages/TestDetails/TestDetails";
import Payment from "../pages/Payment/payment";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'availabletests',
                element: <AllTestPublic></AllTestPublic>,
            },
            {
                path: 'testdetails/:id',
                element: <TestDetails></TestDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/testdetails/${params.id}`)
            }
        ]
    },
    {
        path: 'login',
        element: <Login></Login>,
    },
    {
        path: 'signup',
        element: <Signup></Signup>
    },
    {
        path: 'dashboard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children: [
           {
            path: 'userhome',
            element: <UserHome></UserHome>,
           },
           {
            path: 'upcomingappoinments',
            element: <UpcomingAppoinments></UpcomingAppoinments>
           },
           {
            path: 'testresults',
            element: <TestResults></TestResults>
           },
           {
            path: 'myprofile',
            element: <MyProfile></MyProfile>
           },
           {
            path: 'payment/:id',
            element: <Payment></Payment>,
            loader: ({params}) => fetch(`http://localhost:5000/testdetails/${params.id}`)
           },
        //    Admin Only Routes
        {
            path: 'adminhome',
            element: <AdminHome></AdminHome>

        },
        {
            path: 'allusers',
            element: <AllUsers></AllUsers>,
        },
        {
            path: 'addtest',
            element:<AddTest></AddTest>,
        },
        {
            path: 'alltest',
            element: <AllTests></AllTests>,
        },
        {
            path: 'reservations',
            element: <Reservations></Reservations>,
        },
        {
            path: 'addbanner',
            element: <AddBanners></AddBanners>,
        },
        {
            path: 'allbanners',
            element: <AllBanners></AllBanners>,
        }
           
        ]
    }
    
])

export default router;