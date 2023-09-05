import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/site/Home";
import UserPage from "../pages/site/UserPage";
import Login from "../pages/auth/Login";
import AuthLayout from "../pages/auth/AuthLayout";
import Register from "../pages/auth/Register";
import SiteLayout from "../pages/site/SiteLayout";

const appRouter = createBrowserRouter([

  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
      {
        path: 'login',
        element: <Login/>
      },  
      {
        path: 'register',
        element: <Register/>
      }
    ]
  },
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ]
  },
 
]);

export default appRouter;
