"use client";

import { centerCanvas } from "@/lib/fabric";
import { create } from "zustand";

type canvas = string | null | any

interface EditorStore {
  canvas: canvas;
  designId: string | null;
  setCanvas: (canvas: canvas) => void;
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
