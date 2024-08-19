import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

type wbType = {
  points: number[];
  tool: string;
};

const ydoc = new Y.Doc();

const indexeddbProvider = new IndexeddbPersistence("white-board", ydoc);
indexeddbProvider.whenSynced.then(() => {
  console.log("Yjs synced with indexeddb");
});

const wbArray: Y.Array<wbType> = ydoc.getArray("wbArray");

export { wbArray, indexeddbProvider };
