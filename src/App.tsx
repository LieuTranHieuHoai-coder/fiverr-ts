import "./app.scss";
import { BrowserRouter, createBrowserRouter, Outlet, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./components/navbar/index";
import Footer from "./components/footer/index";
import Home from "./pages/home/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Add from "./pages/add/index";
import Orders from "./pages/orders/index";
import MyGigs from "./pages/myGigs/index";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/index";
import Success from "./pages/success/index";
import MyProfile from "./pages/myProfile";
import Categories from "./pages/categories";
import Gig from "./pages/gig";
import Search from "./pages/search";
import AdminCategory from "./pages/adminCategory";
import Admin from "./pages/adminPages";
import Dashboard from "./pages/adminPages/dashboard";
import BinhLuanPage from "./pages/adminPages/binhluanpage";
import ChiTietPage from "./pages/adminPages/chitietpage";
import CongViecPage from "./pages/adminPages/congviecpage";
import ThueCongViecPage from "./pages/adminPages/thuecviecpage";
import NguoiDungPage from "./pages/adminPages/nguoidungpage";
function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        // {
        //   path: "/myGigs",
        //   element: <MyGigs />,
        // },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/admin-category",
          element: <AdminCategory />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/myprofile",
          element: <MyProfile />,
        },
        {
          path: "/category/:id",
          element: <Categories />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/gigs/:search",
          element: <Search />,
        }
      ]
    },
    {
      path: "/admin",
      element: <Admin/>,
      children: [
        {
          path: "/admin/loai-cong-viec",
          element: <Dashboard />,
        },
        {
          path: "/admin/binh-luan",
          element: <BinhLuanPage />,
        },
        {
          path: "/admin/chi-tiet",
          element: <ChiTietPage />,
        },
        {
          path: "/admin/cong-viec",
          element: <CongViecPage />,
        },
        {
          path: "/admin/nguoi-dung",
          element: <NguoiDungPage />,
        },
        {
          path: "/admin/thue-cong-viec",
          element: <ThueCongViecPage />,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
  // return (
  //   <BrowserRouter>
  //     <RouterProvider router={router} />
  //   </BrowserRouter>
  // );
}

export default App;
