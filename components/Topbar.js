'use client'

import React, { useContext, useState, useRef, useEffect } from 'react';
import AppContext from '../context/AppContext';
import ColorPickerComponent from './reuse/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrush, faEraser, faRefresh, faDownload, faTrashAlt, faUpload, faSave, faFillDrip } from '@fortawesome/free-solid-svg-icons'



const Topbar = ({
}) => {
  // Function to handle canvas clear
  const handleCanvasClear = () => {
    onCanvasClear();
  };


  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const [showColorPicker2, setShowColorPicker2] = useState(false);

  const colorPicker1Ref = useRef(null);
  const colorPicker2Ref = useRef(null);

  const handleToggleColorPicker1 = () => {
    setShowColorPicker1(!showColorPicker1);
  };

  const handleToggleColorPicker2 = () => {
    setShowColorPicker2(!showColorPicker2);
  };

  const { brushCurrentSize, setBrushCurrentSize, brushCurrentColor, setBrushCurrentColor, bucketColor, setBucketColor, navControl, setNavControl } = useContext(AppContext);

  const handleNavControl = (control) => {
    setNavControl(control)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (colorPicker1Ref.current && !colorPicker1Ref.current.contains(event.target)) ||
        (colorPicker2Ref.current && !colorPicker2Ref.current.contains(event.target))
      ) {
        setShowColorPicker1(false);
        setShowColorPicker2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPicker1Ref, colorPicker2Ref]);


  return (
    <div className="top-bar">
      {/* Active Tool */}
      <div className="active-tool">
        <span id="active-tool" title="Active Tool">
          {navControl}
        </span>
      </div>
      {/* Brush */}
      <div className="brush tool">
        <span className='icon-box' onClick={() => handleNavControl('Brush')}> <FontAwesomeIcon icon={faBrush} /> </span>
        <span className='color-box' onClick={handleToggleColorPicker1} style={{ backgroundColor: brushCurrentColor }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>

        {/* Brush Color Picker */}
        {showColorPicker1 && (
          <div ref={colorPicker1Ref} className="color-picker-container" style={{ position: 'absolute', top: '100%', left: '0' }}>
            <br></br>
            <ColorPickerComponent
              initialColor={brushCurrentColor}
              handleColorChange={setBrushCurrentColor}
              label="Brush Color Picker"
            />
          </div>
        )}

        <input
          onClick={handleToggleColorPicker1}
          value={brushCurrentColor}
          onChange={(e) => {
            console.log('Changing color:', brushCurrentColor);
            setBrushCurrentColor(e.target.value)
          }
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
        <span className='icon-box' onClick={() => handleNavControl('Fill')}> <FontAwesomeIcon icon={faFillDrip} /> </span>

        <span className='color-box' onClick={handleToggleColorPicker2} style={{ backgroundColor: bucketColor }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>

        {/* Bucket Color Picker */}
        {showColorPicker2 && (
          <div ref={colorPicker2Ref} className="color-picker-container" style={{ position: 'absolute', top: '100%', left: '0' }}>
            <br></br>
            <ColorPickerComponent
              initialColor={bucketColor}
              handleColorChange={setBucketColor}
              label="Background Color Picker"
            />
          </div>
        )}
        <input
          onClick={handleToggleColorPicker2}
          value={bucketColor}
          onChange={(e) => setBucketColor(e.target.value)}
          className="jscolor"
          id="bucket-color"
        />
      </div>
      {/* Eraser */}
      <div className="tool" onClick={() => handleNavControl('Eraser')}>
        <span className='icon-box' >  <FontAwesomeIcon icon={faEraser} /> </span>
      </div>
      {/* Clear Canvas */}
      <div className="tool">
        <span className='icon-box' onClick={() => handleNavControl('Clear')}>  <FontAwesomeIcon icon={faRefresh} />  </span>
      </div>
      {/* Save Local Storage */}
      <div className="tool">
        <span className='icon-box' onClick={() => handleNavControl('Save')}> <FontAwesomeIcon icon={faDownload} /></span>
      </div>
      {/* Load Local Storage */}
      <div className="tool">
        <span className='icon-box' onClick={() => handleNavControl('Loaded')}>  <FontAwesomeIcon icon={faUpload} /> </span>
      </div>
      {/* Clear Local Storage */}
      <div className="tool">
        <span className='icon-box' onClick={() => handleNavControl('Delete')}> <FontAwesomeIcon icon={faTrashAlt} /> </span>
      </div>
      {/* Download Image */}
      <div className="tool">
        <a id="download">
          <span className='icon-box' onClick={() => handleNavControl('Download')}> <FontAwesomeIcon icon={faSave} />  </span>
        </a>
      </div>
    </div>
  );
};

export default Topbar;
