import { createBrowserRouter } from "react-router-dom";

// import {ProtectedRoute} from "@components/ProtectedRoute"

import Home from "@pages/Home.jsx";
import Login from "@pages/Login";
import SignUp from "@pages/Signup";

//  all the components that are used in the layout
import { AdminLayout, OwnerLayout, GuestLayout } from "@layouts";

//  all the components that are used in the owner dashboard
import {
  AddTurf,
  ManagerDashboard,
  TurfManagement,
  ManagerReviews,
  OwnerBookings,
} from "@components/manager";

//  all the components that are used in the admin dashboard
import {
  UserManagement,
  NewManagerRequests,
  RejectedManagerRequests,
  AdminDashboard,
  ManagerViewer,
  TurfList,
  AllTurf,
  TransactionSection,
} from "@components/admin";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";

// 404 page

import { NotFound } from "@components/common";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "manager-requests",
        children: [
          { path: "new", element: <NewManagerRequests /> },
          { path: "rejected", element: <RejectedManagerRequests /> },
        ],
      },
      { path: "users", element: <UserManagement /> },
      {
        path: "managers",
        children: [
          { path: "", element: <ManagerViewer /> },
          { path: ":managerId/turf", element: <TurfList /> },
        ],
      },

      { path: "turfs", element: <AllTurf /> },
      { path: "transactions", element: <TransactionSection /> },
    ],
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoute requiredRole="manager">
        <OwnerLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ManagerDashboard /> },
      { path: "add-turf", element: <AddTurf /> },
      { path: "turfs", element: <TurfManagement /> },
      { path: "reviews", element: <ManagerReviews /> },
      { path: "bookings", element: <OwnerBookings /> },
    ],
  },
]);

export default router;
