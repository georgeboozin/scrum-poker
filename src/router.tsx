import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Main as MainLayout } from "@/layouts/Main";
import { CreateRoom } from "@/pages/create-room/ui";
import { Room } from "@/pages/room/ui";
import { JoinRoom } from "@/pages/join-room/ui";
import { Error } from "@/pages/error/ui";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<CreateRoom />} />
        <Route path="rooms/:roomId" element={<Room />} />
        <Route path="rooms/:roomId/join" element={<JoinRoom />} />
      </Route>
    </Route>
  )
);
