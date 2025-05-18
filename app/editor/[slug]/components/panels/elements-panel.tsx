"use client";

import { useEditorStore } from "@/hooks/use-editor-store";
import { shapeDefinitions, shapeTypes } from "@/lib/shape-definitions";
import { useEffect, useRef, useState } from "react";

export const ElementsPanel = () => {
  const { canvas } = useEditorStore();
  const miniCanvasRef = useRef<Record<string, any>>({});
  const canvasElementRef = useRef<any>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const timer = setTimeout(async () => {
      try {
        const fabric = await import("fabric");

        for (const shapeType of shapeTypes) {
          const canvasElement = canvasElementRef.current[shapeType];

          if (!canvasElement) continue;

          const canvasId = `mini-canvas-${shapeType}-${Date.now()}`;
          canvasElement.id = canvasId;

          try {
            const definition = shapeDefinitions[shapeType];

            const miniCanvas = new fabric.StaticCanvas(canvasId, {
              height: 100,
              width: 100,
              backgroundColor: "transparent",
              renderOnAddRemove: true,
            });
            miniCanvasRef.current[shapeType] = miniCanvas;
            definition.thumbnail(fabric, miniCanvas);
            miniCanvas.renderAll();
          } catch (definitionErr) {
            console.error("Error while creating definition", definitionErr);
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("failed to init", error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      Object.values(miniCanvasRef.current).forEach((miniCanvas) => {
        if (miniCanvas && typeof miniCanvas.dispose === "function") {
          try {
            miniCanvas.dispose();
          } catch (error) {
            console.error("Error disposing canvas", error);
          }
        }
      });
      miniCanvasRef.current = {};
      setIsInitialized(false);
    };
  }, []);

  const setCanvasRef = (element: HTMLCanvasElement | null , shapeType: typeof shapeTypes[number]) => {
    if(element) {
      canvasElementRef.current[shapeType] = element
    }

  }
  return <div className="h-full overflow-y-auto ">
    <div className="p-4">
      <div className="grid grid-cols-3 gap-1">
        {
          shapeTypes.map((shapeType, index) => (
            <div key={shapeType} className="h-[90px] cursor-pointer flex flex-col items-center justify-center">
              <canvas width={'100'} 
              height={'100'}

              ref={(el) => setCanvasRef(el, shapeType)}
              />
            </div>
          ))
        }
      </div>
    </div>
  </div>;
};
