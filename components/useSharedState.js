import { useState } from 'react';

const useSharedState = () => {
    const [brushCurrentSize, setBrushCurrentSize] = useState(30);
    const [bucketColor, setBucketColor] = useState('#ffffff');
    const [brushCurrentColor, setBrushCurrentColor] = useState('#000000');
    const [isEraser, setIsEraser] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [drawnArray, setDrawnArray] = useState([]);
  

  return { brushCurrentSize, setBrushCurrentSize, bucketColor, setBucketColor, brushCurrentColor, setBrushCurrentColor, isMouseDown, setIsMouseDown, drawnArray, setDrawnArray, isEraser, setIsEraser };
};

export default useSharedState;