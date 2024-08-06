import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { circuitRelayServer } from "@libp2p/circuit-relay-v2";
import { identify } from "@libp2p/identify";
import { tcp } from "@libp2p/tcp";
import { webSockets } from "@libp2p/websockets";
import * as filter from "@libp2p/websockets/filters";
import { createLibp2p } from "libp2p";

const RelayServer = async (pinCode) => {
  const server = await createLibp2p({
    addresses: {
      listen: ["/ip4/0.0.0.0/tcp/0", "/ip4/0.0.0.0/tcp/0/ws"],
    },
    transports: [tcp(), webSockets({ filter: filter.all })],
    connectionEncryption: [noise()],
    streamMuxers: [yamux()],
    connectionGater: {
      denyDialMultiaddr: async () => false,
    },
    services: {
      identify: identify(),
      pubsub: gossipsub(),
      relay: circuitRelayServer(),
    },
  });

  server.services.pubsub.subscribe(pinCode);

  return server;
};

export default RelayServer;
