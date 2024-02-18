// AppProvider.js
import React, { useState } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const [brushCurrentSize, setBrushCurrentSize] = useState(0);
  const [bucketColor, setBucketColor] = useState('#ffffff');
  const [brushCurrentColor, setBrushCurrentColor] = useState('#000000');
  const [isEraser, setIsEraser] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawnArray, setDrawnArray] = useState([]);
  // Add other state variables and functions as needed

  return (
    <AppContext.Provider
      value={{
        brushCurrentSize,
        setBrushCurrentSize,
        bucketColor,
        setBucketColor,
        brushCurrentColor,
        setBrushCurrentColor,
        isEraser, 
        setIsEraser,
        isMouseDown,
        setIsMouseDown,
        drawnArray,
        setDrawnArray
        // Add other state variables and functions as needed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
