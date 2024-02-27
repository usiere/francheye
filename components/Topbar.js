'use client'

import React, { useContext, useState, useRef, useEffect } from 'react';
import AppContext from '../context/AppContext';
import ColorPickerComponent from './reuse/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faEraser, faRefresh, faDownload, faTrashAlt, faUpload, faSave, faFillDrip } from '@fortawesome/free-solid-svg-icons'



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
<div>
  ojpihgiufydtrfguhiljo;
</div>
  );
};

export default Topbar;
