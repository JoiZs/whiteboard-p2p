import { useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { wbArray, indexeddbProvider } from "../utils/crdt";

const Whiteboard = () => {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState<any>([]);
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    indexeddbProvider.whenSynced.then(async () => {
      // console.log(await TransformData(wbArray.toArray()));
      setLines(wbArray.toArray());
    });
  }, []);

  const handleMouseDown = async (e: any) => {
    setMouse(true);
    const point = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [point.x, point.y] }]);
  };
  const habdleMouseMove = (e: any) => {
    if (!mouse) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };
  const handleMouseUp = () => {
    setMouse(false);
    wbArray.push([lines[lines.length - 1]]);
  };
  return (
    <>
      <div className="m-5 flex flex-col gap-5 justify-start">
        <img
          src="../../public/pen.svg"
          alt="penImg"
          className="w-10"
          onClick={() => setTool("pen")}
        />
        <img
          src="../../public/eraser.png"
          alt="eraserImg"
          className="w-10"
          onClick={() => setTool("eraser")}
        />
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={habdleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((line: any, i: any) => {
            return (
              <Line
                key={i}
                points={line.points}
                stroke="black"
                strokeWidth={line.tool === "eraser" ? 10 : 5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Whiteboard;
