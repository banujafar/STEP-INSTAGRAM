import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserPage from "../pages/UserPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
]);

export default appRouter;
