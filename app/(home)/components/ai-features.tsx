import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React from "react";

export default function AiFeatures() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 mt-12 ">
      <h2 className="text-lg font-semibold mb-3 flex items-center justify-center">
        <Sparkles className="size-5 text-purple-500 mr-2" />
        <span>Ai Image Creation</span>
      </h2>
      <p className="text-gray-700 mb-4 text-center">Create stunning thumbnails images for youtube videos</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button className=" transition-colors duration-300 cursor-pointer rounded-full px-5 py-6 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-purple-700 border-purple-200 shadow-sm flex items-center" variant={'outline'}>
          Generate thumbnail from video title
        </Button>
        <Button className=" transition-colors duration-300 cursor-pointer rounded-full px-5 py-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-pink-700 border-pink-200 shadow-sm flex items-center" variant={'outline'}>
          Generate custom thumbnail
        </Button>
      </div>
    </div>
  );
}
