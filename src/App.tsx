import { RouterProvider } from "react-router-dom";
import { AppProvider } from "@/contexts/App";
import { router } from "@/router";
import "./App.css";

export function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
