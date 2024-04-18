import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Conferences from "./views/Conferences";
import ConferenceForm from "./views/ConferenceForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/conferences" />,
            },
            {
                path: "/conferences",
                element: <Conferences />,
            },
            {
                path: "/conferences/new",
                element: <ConferenceForm key="create" />,
            },
            {
                path: "/conferences/:id",
                element: <ConferenceForm key="update" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
