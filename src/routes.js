import { FRIENDS_ROUTE, HOME_ROUTE, PROFILE_ROUTE, TASKS_ROUTE } from "./utils/routes-consts";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Frineds from "./pages/Friends";

export const authRoutes = [
    {
        path: TASKS_ROUTE,
        Component: Tasks
    },
    {
        path: FRIENDS_ROUTE,
        Component: Frineds
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
]