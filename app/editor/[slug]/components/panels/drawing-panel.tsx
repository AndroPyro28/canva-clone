"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/hooks/use-editor-store";
import { cn } from "@/lib/utils";
import { Brush, EraserIcon, Paintbrush, Palette, PencilIcon } from "lucide-react";
import { useState } from "react";

export const DrawingPanel = () => {
  const { canvas } = useEditorStore();
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(5);
  const [drawingOpacity, setDrawingOpacity] = useState(100);
  const [activeTab, setActiveTab] = useState("colors");

  const handleToggleDrawingMode = () => {
    const newMode = !isDrawingMode;
    setIsDrawingMode(newMode)

    if(newMode && isErasing) {
      setIsErasing(false)
    }
  }

  return (
    <div className="p-4">
      <div className="space-y-5">
        <Button
          onClick={handleToggleDrawingMode}
          variant={isDrawingMode ? "default" : "outline"}
          className="w-full py-6 group transition-all"
          size={"lg"}
        >
          <PencilIcon
            className={cn(
              "mr-2 h-5 w-5 ",
              isDrawingMode ? "animate-bounce" : "hover:animate-bounce"
            )}
          />
          <span className="font-medium">
            {isDrawingMode ? "Exit Drawing Mode" : "Enter Drawing Mode"}
          </span>
        </Button>

        {
          isDrawingMode && <Tabs defaultValue="colors" className="full" value={activeTab}>
            <TabsList className="grid grid-cols-3 mb-4" >
              <TabsTrigger value="colors"> <Palette className="mr-2 size-4" /> Colors</TabsTrigger>
              <TabsTrigger value="brush"> <Paintbrush className="mr-2 size-4" /> Brush</TabsTrigger>
              <TabsTrigger value="tools"> <EraserIcon className="mr-2 size-4" /> Tools</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      </div>
    </div>
  );
};
