import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import NotFound from "./routes/NotFound";
import AuthLayout from "./routes/AuthLayout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Books from "./routes/Books";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    element: <AuthLayout />,
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
    path: "/books",
    element: <Books />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
