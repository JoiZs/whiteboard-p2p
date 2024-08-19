import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { encodeStateAsUpdate } from "yjs";

type wbType = {
  points: number[];
  tool: string;
};

const ydoc = new Y.Doc();

const indexeddbProvider = new IndexeddbPersistence("white-board", ydoc);

const wbArray: Y.Array<wbType> = ydoc.getArray("wbArray");

const WbArrayU8 = async () => {
  const data = await indexeddbProvider.whenSynced.then(() => {
    const update = encodeStateAsUpdate(ydoc);
    const u8arr = new Uint8Array(update);

    return u8arr;
  });

  return data;
};

export { wbArray, indexeddbProvider, WbArrayU8 };
