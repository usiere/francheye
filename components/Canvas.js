'use client'
import React, { useEffect, useState } from "react";
import { useCanvas } from "./CanvasContext";
import useSharedState from './useSharedState';


export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  const { brushCurrentSize, setBrushCurrentSize } = useSharedState();
  const { bucketColor, setBucketColor } = useSharedState();
  const { brushCurrentColor, setBrushCurrentColor } = useSharedState();
  const { isEraser, setIsEraser } = useSharedState();
  const { isMouseDown, setIsMouseDown } = useSharedState();
  const { drawnArray, setDrawnArray } = useSharedState();

     // State variable to act as a key
 const [key, setKey] = useState(0);
  

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
    prepareCanvas();
    console.log('brushCurrentSizess', brushCurrentSize)

  }, [brushCurrentSize]);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}