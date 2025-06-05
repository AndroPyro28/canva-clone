"use client";

import { Button } from "@/components/ui/button";
import { textPresets, TtextPresets } from "@/constant";
import { useEditorStore } from "@/hooks/use-editor-store";
import { addTextToCanvas } from "@/lib/fabric";
import { Type } from "lucide-react";

export const TextPanel = () => {
  const { canvas, height, width } = useEditorStore();

  const handleAddCustomText = () => {
    if(!canvas) return

    addTextToCanvas(canvas, 'Enter text here', height, width, {fontSize:24} )
  }

  const handleAddPresetText = (preset: TtextPresets) => {
    if(!canvas) return
    addTextToCanvas(canvas, preset.text, height, width, preset)

  }
  return (
    <div className="h-full overflow-y-auto ">
      <div className="p-4 space-y-4">
        <Button onClick={handleAddCustomText} className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors">
          <Type className="mr-2 size-5 " />
          <span className="font-medium">Add a text box</span>
        </Button>
        <div className="pt-2">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Default Text Styles
          </h4>

          <div className="space-y-2">
            {textPresets.map((preset, index) => (
              <button
              style={{
                fontSize: `${Math.min(preset.fontSize / 1.8, 24)}px`,
                fontWeight: preset.fontWeight,
                fontStyle: preset.fontStyle || 'normal',
                fontFamily: preset.fontFamily
              }}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                key={index}
                onClick={() => handleAddPresetText(preset)}
              >
                {preset.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
