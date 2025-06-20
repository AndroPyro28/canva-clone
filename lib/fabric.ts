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
  //! height and width is the current size of the canvas
  height: number,
  width: number,
  customProps = {}
) => {
  if (!canvas) {
    return null;
  }
  try {
    const props = {
      left: width / 3,
      top: height / 3,
      ...customProps,
    };

    const shape = createShape(shapeType, props) as TCreateShape & {
      id?: string;
    };

    if (shape) {
      shape.id = `${shapeType}-${Date.now()}`;
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
      return shape;
    }
  } catch (error) {
    console.error("error adding shape to the canvas", error);
  }
};

export const addTextToCanvas = async (
  canvas: TCanvas,
  text: string,
  height: number,
  width: number,
  options = {},
  withBackground = false
) => {
  if (!canvas) return null;
  try {
    const { IText } = await import("fabric");

    const defaultProps = {
      left: width / 3,
      top: height / 3,
      fontSize: 24,
      fontFamily: "Arial",
      fill: "#000000",
      padding: withBackground ? 10 : 0,
      textAlign: "left",
      id: `text-${Date.now()}`,
    };

    const textObj = new IText(text, {
      ...defaultProps,
      ...options,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    return textObj;
  } catch (error) {
    console.error(error);
  }
};
