"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorPresets } from "@/constant";
import { useEditorStore } from "@/hooks/use-editor-store";
import { centerCanvas } from "@/lib/fabric";
import { cn } from "@/lib/utils";
import { Check, Palette } from "lucide-react";
import { useState } from "react";

export const SettingsPanel = () => {

  const {canvas} = useEditorStore()
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value)
  }
  const handleApplyChanges = () => {
    if(!canvas) return;

    canvas.set('backgroundColor', backgroundColor)
    canvas.renderAll()
    centerCanvas(canvas)
  }
  const handleColorPresetApple = (color:string) => {
    setBackgroundColor(color)
  }

  return (
    <div className="p-4 space-y-6 ">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="size-5 text-purple-600 " />
        <h3 className="text-lg font-semibold ">Choose background color</h3>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2 mb-3">
          {colorPresets.map((color) => (
            <Tooltip key={color}>
              <TooltipProvider>
                <TooltipTrigger asChild>
                  <button
                    style={{
                      background: color,
                    }}
                    className={cn(
                      `cursor-pointer size-8 rounded-md border transition-transform hover:scale-110 `,
                      color === backgroundColor &&
                        "ring-2 ring-offset-2 ring-primary"
                    )}

                    onClick={() => handleColorPresetApple(color)}
                  >
                    {color === backgroundColor && (
                      <Check className="size-4 text-white mx-auto drop-shadow-md" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color}</p>
                </TooltipContent>
              </TooltipProvider>
            </Tooltip>
          ))}
        </div>
        <div className="flex mt-3 space-x-2 ">
          <div className="relative">
            <Input type="color" value={backgroundColor} onChange={handleColorChange} className="w-12 h-10 p-1 cursor-pointer" />
            <Input type="text" value={backgroundColor} onChange={handleColorChange} className="flex-1" placeholder="#FFFFFF" />
          </div>
        </div>
        <Separator className="my-4 " />
        <Button className="w-full cursor-pointer" onClick={handleApplyChanges}>Apply Changes</Button>
      </div>
    </div>
  );
};
