import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "@/shared/ui/Layout";
import { CreateRoom } from "@/pages/create-room";
import { Room } from "@/pages/room";
import { JoinRoom } from "@/pages/join-room";
import { Error } from "@/pages/error";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<CreateRoom />} />
      <Route path="rooms/:roomId" element={<Room />} />
      <Route path="rooms/:roomId/join" element={<JoinRoom />} />
    </Route>
  )
);
