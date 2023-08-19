import { RouterProvider } from "react-router-dom";
import { Provider } from "@/shared/lib/services/store";
import { router } from "@/router";
import "./App.css";

export function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}
