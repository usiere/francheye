'use client'

// components/Topbar.js
import React, { useContext } from 'react';
import useSharedState from './useSharedState';
import AppContext from '../context/AppContext';


const Topbar = ({
}) => {
  // Function to handle canvas clear
  const handleCanvasClear = () => {
    onCanvasClear();
  };

  // Additional functions...

  const { brushCurrentSize, setBrushCurrentSize, brushCurrentColor, setBrushCurrentColor, bucketColor, setBucketColor } = useContext(AppContext);

  // const { brushCurrentSize, setBrushCurrentSize } = useSharedState();
  // const { bucketColor, setBucketColor } = useSharedState();
  // const { brushCurrentColor, setBrushCurrentColor } = useSharedState();
  // const { isEraser, setIsEraser } = useSharedState();
  // const { isMouseDown, setIsMouseDown } = useSharedState();
  // const { drawnArray, setDrawnArray } = useSharedState();


  return (
    <div className="top-bar">
      {/* Active Tool */}
      <div className="active-tool">
        <span id="active-tool" title="Active Tool">
          Brush
        </span>
      </div>
      {/* Brush */}
      <div className="brush tool">
        <i className="fas fa-brush" id="brush" title="Brush"></i>
        <input
          value={brushCurrentColor}
          onChange={(e) => {
            console.log('Changing color:', brushCurrentColor);
            setBrushCurrentColor(e.target.value)}
          }
          className="jscolor"
          id="brush-color"
        />
    
        <span className="size" id="brush-size" title="Brush Size">
          {brushCurrentSize}
        </span>
        <input
          type="range"
          min="1"
          max="50"
          value={brushCurrentSize}
          onChange={(e) => setBrushCurrentSize(e.target.value)}
          className="slider"
          id="brush-slider"
        />
      </div>
      {/* Bucket */}
      <div className="bucket tool">
        <i className="fas fa-fill-drip" title="Background Color"></i>
        <input
          value={bucketColor}
          onChange={(e) => setBucketColor(e.target.value)}
          className="jscolor"
          id="bucket-color"
        />
      </div>
      {/* Eraser */}
      <div className="tool">
        <i className="fas fa-eraser" id="eraser" title="Eraser"></i>
      </div>
      {/* Clear Canvas */}
      <div className="tool" onClick={handleCanvasClear}>
        <i className="fas fa-undo-alt" id="clear-canvas" title="Clear"></i>
      </div>
      {/* Save Local Storage */}
      <div className="tool">
        <i
          className="fas fa-download"
          id="save-storage"
          title="Save Local Storage"
        ></i>
      </div>
      {/* Load Local Storage */}
      <div className="tool">
        <i
          className="fas fa-upload"
          id="load-storage"
          title="Load Local Storage"
        ></i>
      </div>
      {/* Clear Local Storage */}
      <div className="tool">
        <i
          className="fas fa-trash-alt"
          id="clear-storage"
          title="Clear Local Storage"
        ></i>
      </div>
      {/* Download Image */}
      <div className="tool">
        <a id="download">
          <i className="far fa-save" title="Save Image File"></i>
        </a>
      </div>
    </div>
  );
};

export default Topbar;
