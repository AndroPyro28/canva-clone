import { TCanvas } from "@/hooks/use-editor-store";
import { Canvas } from "fabric";
import { createShape, TCreateShape } from "./shape-factory";
import { shapeDefinitions, TShapeType } from "./shape-definitions";

export const initializeFabric = async (
  canvasEl: HTMLCanvasElement,
  containerEl: any
) => {
  try {
    const { Canvas, PencilBrush } = await import("fabric");

    // initializing canvas
    const canvas = new Canvas(canvasEl, {
      preserveObjectStacking: true,
      renderOnAddRemove: true,
    });

    // initializing brush
    const brush = new PencilBrush(canvas);

    // configuring brush
    brush.color = "#000000";
    brush.width = 5;

    // finally adding brush to the canvas
    canvas.freeDrawingBrush = brush;

    return canvas;
  } catch (error) {
    console.error(error, "failed to load fabric");
  }
};

export const centerCanvas = (canvas: TCanvas) => {
  if (!canvas || canvas.wrapperEl) return;

  const canvasWrapper = canvas.wrapperEl as Canvas["wrapperEl"];
  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = `absolute`;
  canvasWrapper.style.left = `50%`;
  canvasWrapper.style.top = `50%`;
  canvasWrapper.style.transform = `translate(-50%, -50%)`;
};

export const addShapeToCanvas = async (
  canvas: TCanvas,
  shapeType: TShapeType,
  height: number,
  width: number,
  customProps = {}
) => {
  if (!canvas) {
    return null;
  }
  try {

    const fabricModule = await import("fabric");
    const shape = createShape(fabricModule, shapeType, shapeDefinitions, {
      left: (width/3),
      top: (height/3),
      ...customProps,
    }) as TCreateShape & {
      id?: string
    }

    if(shape) {
        shape.id = `${shapeType}-${Date.now()}`
        canvas.setActiveObject(shape)
        canvas.add(shape)
        canvas.renderAll()
        return shape
    }
  } catch (error) {}
};
