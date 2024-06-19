import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
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
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
