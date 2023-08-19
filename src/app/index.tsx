import { RouterProvider } from "react-router-dom";
import { Provider } from "@/shared/lib/services/store";
import { router } from "@/pages";
import "./index.css";

export function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}
