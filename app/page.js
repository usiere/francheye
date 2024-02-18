'use client'

// import PaintApp from '../components/PaintApp';
import { Canvas } from '../components/Canvas'
import { ClearCanvasButton } from '../components/ClearCanvasButton';
import { CanvasProvider } from "../components/CanvasContext";
import React, { useEffect, useState, useContext } from "react";




export default function Home() {

  // const { brushCurrentSize, setBrushCurrentSize } = useSharedState();


 return (
  <div>
   <CanvasProvider>
      <Canvas/>
      <ClearCanvasButton/>
    </CanvasProvider>
     
</div>
 )
}
