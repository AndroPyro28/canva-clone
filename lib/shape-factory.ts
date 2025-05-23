import { TShapeType } from "./shape-definitions";
import fabricModule from "fabric"
export const createShape = (fabric: typeof fabricModule, type: TShapeType, shapeDefinitions: any, customProps: Record<string, any>) => {

    const definition = shapeDefinitions[type];

    if(!definition) {
        return null
    }

    const props = {
        ...definition.defaultProps,
        ...customProps
    }

    switch(definition.type) {
        case 'rect':
            return new fabric.Rect(props);

        case 'circle':
            return new fabric.Circle(props);

        default: 
            return null;

    }
}

export type TCreateShape = ReturnType<typeof createShape>