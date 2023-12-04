import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="max-w-screen-xl mx-auto font-inter">
            <RouterProvider router={router}></RouterProvider>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
    <Toaster />
  </React.StrictMode>
);
