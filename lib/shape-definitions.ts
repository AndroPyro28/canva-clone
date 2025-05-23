import { Canvas, StaticCanvas, StaticCanvasEvents } from "fabric";
import { HeartIcon } from "lucide-react";
export const shapeDefinitions = {
    rectangle: {
        type: 'rect',
        label: 'rectangle',
        defaultProps: {
            width:100,
            height:60,
            fill: '#000000',
        },
        thumbnail: (fabric: Record<string, any> , canvas: StaticCanvas<StaticCanvasEvents>) => {
            const {Rect} = fabric

            const rect = new Rect({
                left: 15,
                top: 35,
                width: 70,
                height:35,
                fill: '#000000'
            });
            canvas.add(rect);
        }
    },
    circle: {
        type: 'circle',
        label: 'Circle',
        defaultProps: {
            radius:50,
            fill: '#000000',
        },
        thumbnail: (fabric: Record<string, any> , canvas: StaticCanvas<StaticCanvasEvents>) => {
            const {Circle} = fabric

            const circle = new Circle({
                left: 20,
                top: 20,
                radius: 30,
                fill: '#000000'
            });
            canvas.add(circle);
        }
    },

    
}

export const shapeTypes: ['rectangle', 'circle'] = [
    'rectangle',
    'circle'
]

export type TShapeType = typeof shapeTypes[number]