import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, HomeLayout } from "../layouts";
import { BlogPage, Home, Login, Profile, Signup } from "../pages";
import { ROUTES } from "../config/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES.BLOG,
        element: <BlogPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    path: ROUTES.SIGNUP,
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
