import { createLibp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";
import * as filter from "@libp2p/websockets/filters";
import { webRTC } from "@libp2p/webrtc";
import { webTransport } from "@libp2p/webtransport";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { bootstrap } from "@libp2p/bootstrap";
import { pubsubPeerDiscovery } from "@libp2p/pubsub-peer-discovery";
import { identify } from "@libp2p/identify";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";

const ClientNode = async (relayAddrs: any, topicSec: string) => {
  const clientnode = await createLibp2p({
    addresses: {
      listen: ["/webrtc"],
    },
    transports: [
      webSockets({
        filter: filter.all,
      }),
      webRTC(),
      webTransport(),
      circuitRelayTransport({
        discoverRelays: 1,
      }),
    ],
    connectionEncryption: [noise()],
    streamMuxers: [yamux()],
    connectionGater: {
      denyDialMultiaddr: async () => false,
    },
    peerDiscovery: [
      bootstrap({
        list: relayAddrs,
      }),
      pubsubPeerDiscovery({
        interval: 10_000,
        topics: [topicSec],
      }),
    ],
    services: {
      identify: identify(),
      pubsub: gossipsub(),
    },
  });

  return clientnode;
};

export default ClientNode;
