export const initializeFabric = async (canvasEl: HTMLCanvasElement, containerEl: any) => {
    try {
        
        const { Canvas, PencilBrush } = await import("fabric")

        // initializing canvas
        const canvas = new Canvas(canvasEl, {
            preserveObjectStacking: true,
            renderOnAddRemove:true
        })

        // initializing brush
        const brush = new PencilBrush(canvas)

        // configuring brush
        brush.color = '#000000'
        brush.width = 5

        // finally adding brush to the canvas
        canvas.freeDrawingBrush = brush

        return canvas
    } catch (error) {
        console.error(error, 'failed to load fabric');
    }
}

export const centerCanvas = (canvas:string) => {
    if(!canvas) return;
}