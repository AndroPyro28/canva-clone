"use client";

import { centerCanvas } from "@/lib/fabric";
import { create } from "zustand";

interface EditorStore {
  canvas: string | null;
  designId: string | null;
  setCanvas: (canvas: string) => void;
  setDesignId: (designId: string) => void;
  resetStore: () => void;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  canvas: null,
  designId: null,
  setDesignId: (id) => set({ designId: id }),
  resetStore: () => set({canvas: null, designId: null}),
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },
}));
