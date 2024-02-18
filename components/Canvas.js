'use client'
import React from "react";
import { useCanvas } from "./CanvasContext";


export function Canvas() {
  const {
    canvasRef,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();


  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}