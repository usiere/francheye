import React, { useState, useEffect, useRef } from 'react';
import { HuePicker } from 'react-color';

const ColorPickerComponent = ({ initialColor, handleColorChange, label }) => {
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const colorPickerRef = useRef(null);

    const handleChange = (newColor) => {
        setSelectedColor(newColor.hex);
        handleColorChange(newColor.hex); // Pass selected color to parent
    };

    const handleClickOutside = (event) => {
        if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={colorPickerRef}>
            {/* Remove button */}
            {/* <button onClick={handleButtonClick}>
        {showPicker ? 'Hide' : label}
      </button> */}
            {/* Always show HuePicker */}
            <HuePicker color={selectedColor} onChange={handleChange} />
        </div>
    );
};

export default ColorPickerComponent;
