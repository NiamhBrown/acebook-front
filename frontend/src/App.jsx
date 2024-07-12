import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";

import { ProfilePage } from "./pages/profile/ProfilePage";
import UserProfile from "./components/profile/UserProfile";

import { FriendsPage } from "./pages/Friend/FriendsPage";
import { RequestPage } from "./pages/Requests/RequestsPage";


// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
  {

    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:userid",
    element: <UserProfile />, 
  },
  {
    path: "/friends",
    element: <FriendsPage/>
  },
  {
    path: "/requests",
    element: <RequestPage/>
  }

]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
      
    </>
  );
};

export default App;
