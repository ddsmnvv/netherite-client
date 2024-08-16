import { FRIENDS_ROUTE, HOME_ROUTE, PROFILE_ROUTE, TASKS_ROUTE } from "./utils/routes-consts";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";
import Frens from "./pages/Frens";

export const authRoutes = [
    {
        path: TASKS_ROUTE,
        Component: Tokens
    },
    {
        path: FRIENDS_ROUTE,
        Component: Frens
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