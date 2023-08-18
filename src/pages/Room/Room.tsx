import { Provider } from "@/services/hands";
import { HostRoom } from "@/widgets/HostRoom";
import { TeammateRoom } from "@/widgets/TeammateRoom";
import { useStore } from "@/services/store";

export function Room() {
  const { user } = useStore();

  return <Provider>{user.isHost ? <HostRoom /> : <TeammateRoom />}</Provider>;
}
