import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/site/Home";
import UserPage from "../pages/site/UserPage";
import Login from "../pages/auth/Login";
import AuthLayout from "../pages/auth/AuthLayout";
import Register from "../pages/auth/Register";
import SiteLayout from "../pages/site/SiteLayout";
import PrivateRoute from "../components/auth/PrivateRoute";
import MainLayout from "../pages/MainLayout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"/auth/login"} replace={true} />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <SiteLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "user",
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
