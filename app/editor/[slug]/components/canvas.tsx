"use client";
import { useEditorStore } from "@/hooks/use-editor-store";
import { initializeFabric } from "@/lib/fabric";
import React, { useEffect, useRef } from "react";

type canvasProps = {};
export const Canvas: React.FC<canvasProps> = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const fabricCanvasRef = useRef<any>(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas } = useEditorStore();

  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.error("error disposing canvas");
        }

        fabricCanvasRef.current = null;
        setCanvas(null);
      }
    };

    cleanUpCanvas();

    initAttemptedRef.current = false;

    // init our canva
    const initCanvas = async () => {
      if (
        typeof window === undefined ||
        !canvasRef.current ||
        initAttemptedRef.current
      ) {
        return;
      }

      initAttemptedRef.current = true;

      try {
        const fabricCanvas = await initializeFabric(
          canvasRef.current,
          canvasContainerRef.current
        );

        if (!fabricCanvas) {
          console.error("failed to initialize fabric js");
          return;
        }

        fabricCanvasRef.current = fabricCanvas;

        setCanvas(fabricCanvas);

        console.log("canvas init is done and set in store");

        //TODOs:  
        //* apply custom style from the controls
        //* set up listeners
        
        
        
        
      } catch (err) {
        console.error("failed to init", err);
      }
    };
    const timer = setTimeout(() => initCanvas(), 50);

    return () => {
      clearTimeout(timer);
      cleanUpCanvas();
    };
  }, []);

  return <div className="relative w-full h-[600px] overflow-auto" ref={canvasContainerRef}>

    <canvas ref={canvasRef}>

    </canvas>

  </div>;
};
