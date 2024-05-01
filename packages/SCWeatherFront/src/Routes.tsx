import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AuthGate from "./components/guards/AuthGate";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import GuestGuard from "./components/guards/GuestGuard";
import AuthGuard from "./components/guards/AuthGuard";
import CamIframe from "./components/CamIframe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGate />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "home",
    element: (
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    ),
  },
  {
    path: "cam",
    element: (
      <CamIframe />
    ),
  },
]);

export default router;
