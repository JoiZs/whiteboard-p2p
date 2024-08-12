import { useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

const Whiteboard = () => {
  const [lines, setLines] = useState<any>([]);
  const [mouse, setMouse] = useState(false);
  const handleMouseDown = (e: any) => {
    setMouse(true);
    console.log("Mouse Down");
    const point = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [point.x, point.y] }]);
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
    console.log(lines);
  };
  const handleMouseUp = () => {
    setMouse(false);
    console.log("Mouse Up");
  };
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={habdleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <Text text="Just start drawing" fontSize={15} />
        {lines.map((line: any, i: any) => {
          return (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={"source-over"}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Whiteboard;
