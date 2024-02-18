import { useState } from 'react';

const useSharedState = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [drawnArray, setDrawnArray] = useState([]);
  

  return { isMouseDown, setIsMouseDown, drawnArray, setDrawnArray };
};

export default useSharedState;