import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import UserPage from "../pages/UserPage";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root />
    },

    {
        path: "/users/:id",
        element: <UserPage />
    },

]);

export default router;