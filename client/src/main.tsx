import { Toaster } from "@/components/ui/toaster";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthLayout from "./routes/AuthLayout";
import Books from "./routes/Books";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Register from "./routes/Register";
import Root from "./routes/root";

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

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
