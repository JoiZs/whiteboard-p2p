import { pipe } from "it-pipe";
import map from "it-map";
import { indexeddbProvider, wbArray } from "./crdt";

type wbType = {
  points: number[];
  tool: string;
};

const TransformData = async (stream: any) => {
  let dataArr: wbType[] = [];

  await indexeddbProvider.whenSynced.then(async () => {
    dataArr = wbArray.toArray();
  });

  const jsonStr = JSON.stringify(dataArr);
  const u8Arr = new TextEncoder().encode(jsonStr);

  async function* createAsyncIterableFromUint8Array(uint8Array: Uint8Array) {
    yield uint8Array;
  }

  const result = await pipe(
    createAsyncIterableFromUint8Array(u8Arr),
    (source) => map(source, (chunk) => chunk),
    stream.sink,
  );

  return result;
};

export default TransformData;
