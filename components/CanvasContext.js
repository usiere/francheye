'use client'
import React, { useEffect, useRef, useState, useContext } from "react";
import useSharedState from './useSharedState';
import AppContext from '../context/AppContext';


const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  

  const { brushCurrentSize, setBrushCurrentSize, brushCurrentColor, setBrushCurrentColor } = useContext(AppContext);
const { bucketColor, setBucketColor } = useSharedState();
const { isEraser, setIsEraser } = useSharedState();
const { isMouseDown, setIsMouseDown } = useSharedState();
const { drawnArray, setDrawnArray } = useSharedState();

 // State variable to act as a key
 const [key, setKey] = useState(0);

  // Trigger re-render when brushCurrentSize changes

// ... (previous state and context declarations)
const [currentPath, setCurrentPath] = useState([]);

const prepareCanvas = () => {
  const canvas = canvasRef.current;
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  const context = canvas.getContext("2d");
  context.scale(2, 2);
  context.lineCap = "round";
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the existing paths
  drawnArray.forEach((path) => {
    context.strokeStyle = path.color;
    context.lineWidth = path.size;
    context.beginPath();
    context.moveTo(path.points[0].x, path.points[0].y);
    path.points.forEach((point) => {
      context.lineTo(point.x, point.y);
    });
    context.stroke();
    context.closePath();
  });

  // Draw the current brush settings
  context.strokeStyle = brushCurrentColor;
  context.lineWidth = brushCurrentSize;
  contextRef.current = context;
};


useEffect(() => {
  setCurrentPath([]);
  prepareCanvas();
}, [brushCurrentColor, brushCurrentSize, drawnArray]);

const startDrawing = ({ nativeEvent }) => {
  const { offsetX, offsetY } = nativeEvent;
  setCurrentPath([{ x: offsetX, y: offsetY }]);
  contextRef.current.beginPath();
  contextRef.current.moveTo(offsetX, offsetY);
  setIsDrawing(true);
};

const finishDrawing = () => {
  contextRef.current.closePath();
  setIsDrawing(false);
  // Save the current path to the drawnArray
  if (currentPath.length > 1) { // Ensure there are multiple points to draw
    setDrawnArray([...drawnArray, { points: [...currentPath], color: brushCurrentColor, size: brushCurrentSize }]);
  }
  setCurrentPath([]); // Clear the current path
};

const draw = ({ nativeEvent }) => {
  if (!isDrawing) {
    return;
  }

  const { offsetX, offsetY } = nativeEvent;
  contextRef.current.lineTo(offsetX, offsetY);
  contextRef.current.stroke();

  // Save the current point to the currentPath
  setCurrentPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
};

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "green"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
   
  );
};

export const useCanvas = () => useContext(CanvasContext);