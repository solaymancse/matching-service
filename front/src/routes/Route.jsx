import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Services from "../components/Services";
import User from "../components/User";
import ServiceAssignment from "../components/ServiceAssignment";
import ServiceStatus from "../components/ServiceStatus";
export const route = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "/",
                element: <Services />,
            },
            {
                path: "/user",
                element: <User />,
            },
            {
                path: "/assign",
                element: <ServiceAssignment />,
            },
            {
                path: "/status",
                element: <ServiceStatus />,
            }
        ]


    },
])