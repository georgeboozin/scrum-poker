import { Provider } from "@/shared/lib/services/hands";
import { HostRoom } from "@/widgets/host-room";
import { TeammateRoom } from "@/widgets/teammate-room";
import { useStore } from "@/shared/lib/services/store";

export function Room() {
  const { user } = useStore();

  return <Provider>{user.isHost ? <HostRoom /> : <TeammateRoom />}</Provider>;
}
