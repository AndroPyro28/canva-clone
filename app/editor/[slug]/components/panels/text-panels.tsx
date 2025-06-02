"use client";

import { Button } from "@/components/ui/button";
import { textPresets } from "@/constant";
import { useEditorStore } from "@/hooks/use-editor-store";
import { Type } from "lucide-react";

export const TextPanel = () => {
  const { canvas } = useEditorStore();
  return (
    <div className="h-full overflow-y-auto ">
      <div className="p-4 space-y-4">
        <Button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors">
          <Type className="mr-2 size-5 " />
          <span className="font-medium">Add a text box</span>
        </Button>
        <div className="pt-2">
          <h4 className="text-sm font-medium text-gray-800">
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
