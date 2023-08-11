import { useCallback, useRef } from "react";
import { Peer, DataConnection } from "peerjs";

export function usePeerManager() {
  const peerManager = useRef<Peer | null>(null);
  const connections = useRef<{ [key: string]: DataConnection }>({});

  const setPeerManager = useCallback((peer: Peer) => {
    peerManager.current = peer;
  }, []);

  const onOpen = useCallback(
    (handler: (id: string) => void) => {
      peerManager.current?.on("open", handler);
    },
    [peerManager]
  );

  const onError = useCallback(
    (handler: (error: Error) => void) => {
      peerManager.current?.on("error", handler);
    },
    [peerManager]
  );

  const onConnection = useCallback(
    (handler: (connection: DataConnection) => void) => {
      peerManager.current?.on("connection", (connection) => {
        connections.current[connection.peer] = connection;
        handler(connection);
      });
    },
    [peerManager]
  );

  const onConnectionData = useCallback(
    <T>(peerId: string, handler: (data: T) => void) => {
      connections.current[peerId].on(
        "data",
        handler as (data: unknown) => void
      );
    },
    []
  );

  const onConnectionOpen = useCallback(
    (peerId: string, handler: () => void) => {
      connections.current[peerId].on("open", handler);
    },
    []
  );

  const onConnectionClose = useCallback(
    (peerId: string, handler: () => void) => {
      connections.current[peerId].on("close", () => {
        handler();
        delete connections.current[peerId];
      });
    },
    []
  );

  const closeConnections = useCallback(() => {
    Object.values(connections.current).forEach((connection) => {
      connection.close();
      delete connections.current[connection.peer];
    });
    peerManager.current?.disconnect();
    peerManager.current = null;
  }, []);

  const connect = useCallback(
    (id: string) => {
      const connection = peerManager.current?.connect(id);
      if (connection) {
        connections.current[connection.peer] = connection;
        return connection;
      }
    },
    [peerManager]
  );

  const send = useCallback(<T>(connectionId: string, event: T) => {
    connections.current[connectionId].send(event);
  }, []);

  const broadcast = useCallback(<T>(event: T, exceptions: string[] = []) => {
    Object.entries(connections.current).forEach(
      ([connectionId, connecition]) => {
        if (!exceptions.includes(connectionId)) {
          connecition.send(event);
        }
      }
    );
  }, []);

  return {
    peerManager,
    setPeerManager,
    connections,
    onOpen,
    onError,
    onConnection,
    onConnectionData,
    onConnectionOpen,
    onConnectionClose,
    connect,
    send,
    broadcast,
    closeConnections,
  };
}
