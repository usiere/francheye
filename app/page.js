'use client'

import { Canvas } from '../components/Canvas'
import { ClearCanvasButton } from '../components/ClearCanvasButton';
import { CanvasProvider } from "../components/CanvasContext";
import React from "react";




export default function Home() {


 return (
  <div>
   <CanvasProvider>
      <Canvas/>
      <ClearCanvasButton/>
    </CanvasProvider>
     
</div>
 )
}
