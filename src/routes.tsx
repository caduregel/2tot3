
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from './pages/About.tsx';
import Home from "./pages/Home.tsx";
import HowToPage from "./pages/HowToPage.tsx";
import SelectFriendsPage from "./pages/selectFriendsPage.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/how-to',
                element: <HowToPage />
            },
            {
                path: '/select-friends',
                element: <SelectFriendsPage />
            }
        ]
    },


];

export default routes;