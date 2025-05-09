"use client";

import { centerCanvas } from "@/lib/fabric";
import { Canvas } from "fabric";
import { create } from "zustand";

export type TCanvas = null | Canvas;

interface EditorStore {
  canvas: TCanvas;
  setCanvas: (canvas: TCanvas) => void;
  designId: string | null;
  setDesignId: (designId: string) => void;
  name: string;
  setName: (value: string) => void;
  isEditing: boolean;
  setIsEditing: (flag: boolean) => void;
  resetStore: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  designId: null,
  setDesignId: (id) => set({ designId: id }),

  isEditing: true,
  setIsEditing: (flag) => set({ isEditing: flag }),

  name: 'Untitled Design',
  setName: (value) => set({ name: value }),

  resetStore: () => set({ canvas: null, designId: null, isEditing: true }),
  canvas: null,
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },
}));
