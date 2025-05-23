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
  height: number;
  width: number;
  setHeight: (value:number) => void
  setWidth: (value:number) => void
  setIsEditing: (flag: boolean) => void;
  resetStore: () => void;
}

const DEFAULT_NAME = 'Untitled Design'

export const useEditorStore = create<EditorStore>((set, get) => ({
  designId: null,
  setDesignId: (id) => set({ designId: id }),
  isEditing: true,
  setIsEditing: (flag) => set({ isEditing: flag }),

  name: DEFAULT_NAME,
  setName: (value) => set({ name: value }),
  height:0,
  setHeight: (value) => set({ height: value }),
  width:0,
  setWidth: (value) => set({ width: value }),
  resetStore: () => set({ canvas: null, designId: null, isEditing: true, name: DEFAULT_NAME }),
  canvas: null,
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },
}));
