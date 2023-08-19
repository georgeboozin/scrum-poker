import { Provider } from "@/shared/lib/services/hands";
import { HostRoom } from "@/widgets/HostRoom";
import { TeammateRoom } from "@/widgets/TeammateRoom";
import { useStore } from "@/shared/lib/services/store";

export function Room() {
  const { user } = useStore();

  return <Provider>{user.isHost ? <HostRoom /> : <TeammateRoom />}</Provider>;
}
