import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Main as MainLayout } from "@/layouts/Main";
import { Login } from "@/pages/Login";
import { Room } from "@/pages/Room";
import { JoinRoom } from "@/pages/JoinRoom";
import { Error } from "@/pages/Error";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Login />} />
        <Route id="room" path="rooms/:roomId" element={<Room />} />
        <Route path="rooms/:roomId/join" element={<JoinRoom />} />
      </Route>
    </Route>
  )
);
