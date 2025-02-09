import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/InputStudentsPage.tsx";
import HowToPage from "./pages/HowToPage.tsx";
import SelectFriendsPage from "./pages/SelectFriendsPage.tsx";
import SortStudentsPage from "./pages/SortStudentsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import MeerInfoPage from "./pages/MeerInfo.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: '/input-students',
                element: <Home />
            },
            {
                path: '/how-to',
                element: <HowToPage />
            },
            {
                path: '/select-friends',
                element: <SelectFriendsPage />
            },
            {
                path: '/sorting',
                element: <SortStudentsPage />
            },
            {
                path: "/more-info",
                element: <MeerInfoPage />
            }
        ]
    },


];

export default routes;