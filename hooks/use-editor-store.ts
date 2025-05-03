"use client";

import { centerCanvas } from "@/lib/fabric";
import { Canvas } from "fabric";
import { create } from "zustand";

export type TCanvas = null | Canvas

interface EditorStore {
  canvas: TCanvas;
  designId: string | null;
  setCanvas: (canvas: TCanvas) => void;
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
