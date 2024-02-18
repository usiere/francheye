'use client'
import React, { useEffect, useRef, useState, useContext } from "react";
import useSharedState from './useSharedState';
import AppContext from '../context/AppContext';


const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);


  const { brushCurrentSize, brushCurrentColor, bucketColor, navControl, setNavControl } = useContext(AppContext);
  const { drawnArray, setDrawnArray } = useSharedState();

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
    context.fillStyle = bucketColor;
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
  }, [brushCurrentColor, brushCurrentSize, bucketColor, drawnArray]);

  useEffect(() => {
    if (navControl === 'Clear') {
      clearCanvas();
      setNavControl('Brush');
    } else if (navControl === 'Download') {
      downloadCanvas();
      setNavControl('Brush'); // Reset navControl after download
    } else if (navControl === 'Save') {
      saveCanvasData();
      setNavControl('Brush'); // Reset navControl after saving
    } else if (navControl === 'Loaded') {
      loadCanvasData();
      setNavControl('Brush'); // Reset navControl after loading
    } else if (navControl === 'Delete') {
      deleteCanvasData();
      setNavControl('Brush'); // Reset navControl after deleting
    }
  }, [navControl]);

  const deleteCanvasData = () => {
    localStorage.removeItem('canvasData');
  };
  const loadCanvasData = () => {
    const canvas = canvasRef.current;
    const storedCanvasData = localStorage.getItem('canvasData');

    if (storedCanvasData) {
      const image = new Image();
      image.onload = () => {
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate dimensions to maintain aspect ratio
        const aspectRatio = image.width / image.height;
        let newWidth = canvas.width;
        let newHeight = canvas.width / aspectRatio;

        if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = canvas.height * aspectRatio;
        }

        // Center the image on the canvas
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        contextRef.current.drawImage(image, x, y, newWidth, newHeight);
      };
      image.src = storedCanvasData;
    }
  };



  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    const canvasData = canvas.toDataURL('image/png');
    localStorage.setItem('canvasData', canvasData);
    // You can add additional logic if needed, like showing a success message
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'canvas_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


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

  // Erasing functionality
const drawWithEraser = ({ nativeEvent }) => {
  if (!isDrawing) {
    return;
  }

  const { offsetX, offsetY } = nativeEvent;

  // Use the background color to effectively erase
  const eraserColor = bucketColor;

  contextRef.current.fillStyle = eraserColor;
  contextRef.current.fillRect(
    offsetX - brushCurrentSize / 2,
    offsetY - brushCurrentSize / 2,
    brushCurrentSize,
    brushCurrentSize
  );

  // Update the drawnArray with the erased path
  setDrawnArray((prevDrawnArray) => {
    const updatedArray = [
      ...prevDrawnArray,
      { points: [{ x: offsetX, y: offsetY }], color: eraserColor, size: brushCurrentSize },
    ];
    return updatedArray;
  });

  setCurrentPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]);
};


  const startErasing = ({ nativeEvent }) => {
    startDrawing({ nativeEvent });
    drawWithEraser({ nativeEvent });
  };

  const finishErasing = () => {
    finishDrawing();
    setCurrentPath([]); // Clear the current path when finishing erasing
  };

  const drawHandler = navControl === 'Eraser' ? drawWithEraser : draw;

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = bucketColor; // Use your preferred background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    setDrawnArray([]); // Clear the drawnArray
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing: navControl === 'Eraser' ? startErasing : startDrawing,
        finishDrawing: navControl === 'Eraser' ? finishErasing : finishDrawing,
        clearCanvas,
        draw: drawHandler,
      }}
    >
      {children}
    </CanvasContext.Provider>

  );
};

export const useCanvas = () => useContext(CanvasContext);