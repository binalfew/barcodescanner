import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexRoute from "./routes";
import RootRoute from "./routes/root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
