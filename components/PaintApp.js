'use client'
// components/PaintApp.js
import React, { useState } from 'react';
import Canvas from './Canvas';
import Topbar from './Topbar';

const PaintApp = () => {
  // State variables
  const [brushCurrentSize, setBrushCurrentSize] = useState(10);
  const [bucketColor, setBucketColor] = useState('#ffffff');
  const [brushCurrentColor, setBrushCurrentColor] = useState('#000000');
  const [isEraser, setIsEraser] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawnArray, setDrawnArray] = useState([]);

  // Other state variables...

  const handleCanvasReady = (canvasFunctions) => {
    // Set state variables and functions provided by the Canvas component
    // Additional initialization logic...
  };

  const handleDraw = (drawnData) => {
    console.log('drawnData', drawnData)
    setDrawnArray((prevDrawnArray) => [...prevDrawnArray, drawnData]);
    console.log('drawn array', drawnArray)

    // Handle drawing logic...
  };

  const handleCanvasClear = () => {
    // Handle canvas clearing logic...
  };

  return (
    <div>
        <Topbar
        brushCurrentSize={brushCurrentSize}
        setBrushCurrentSize={setBrushCurrentSize}
        bucketColor={bucketColor}
        setBucketColor={setBucketColor}
        brushCurrentColor={brushCurrentColor}
        setBrushCurrentColor={setBrushCurrentColor}
        onCanvasClear={handleCanvasClear}  // Pass the callback function
      />
      <Canvas
        onCanvasReady={handleCanvasReady}
        onDraw={handleDraw}
        onCanvasClear={handleCanvasClear}
        isMouseDown={isMouseDown}
        setIsMouseDown={setIsMouseDown}
        isEraser={isEraser}
        setIsEraser={setIsEraser}
        drawnArray={drawnArray}
        setDrawnArray={setDrawnArray}
      />
    </div>
  );
};

export default PaintApp;
