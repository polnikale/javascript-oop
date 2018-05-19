// interface IApp { Решил, что нет смысла реализовывать интерфейс ради простых хендлеров
//   handleCanvasMousedown(event: MouseEvent): void;
//   handleCanvasMousemove(event: MouseEvent): void;
//   handleCanvasMouseup(event: MouseEvent): void;
//   handleCanvasMouseleave(event: MouseEvent): void;
//   handleCanvasClear(event: MouseEvent): void;
//   handleBrushSizeChange(event: MouseEvent): void;
// }
export default class App {
    constructor({ canvas, colorPalette, colorPicker }) {
        this.canvas = canvas;
        this.colorPalette = colorPalette;
        this.colorPicker = colorPicker;
        this.context = null;
        this.isDrawing = false;
        this.init();
    }
    init() {
        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.handleCanvasMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));
        this.closeBtn = document.querySelector('#clear-canvas-button');
        this.changeBrushWidthInput = document.querySelector('#brush-size-slider');
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.handleCanvasClear.bind(this));
        }
        if (this.changeBrushWidthInput) {
            this.changeBrushWidthInput.addEventListener('change', this.handleBrushSizeChange.bind(this));
        }
        this.colorPicker.on('colorAdd', (color) => {
            this.colorPalette.createColor({ color });
        });
    }
    handleCanvasMousedown(event) {
        this.lastEvent = event;
        this.isDrawing = true;
    }
    handleCanvasMousemove(event) {
        if (!this.context || !this.lastEvent) {
            return;
        }
        if (this.isDrawing) {
            this.context.beginPath();
            this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.strokeStyle = this.colorPalette.currentColor;
            this.context.stroke();
            this.lastEvent = event;
        }
    }
    handleCanvasMouseup(event) {
        this.isDrawing = false;
    }
    handleCanvasMouseleave(event) {
        this.isDrawing = false;
    }
    handleCanvasClear(event) {
        if (!this.context) {
            return;
        }
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    handleBrushSizeChange(event) {
        const target = event.target;
        if (!this.context || !target) {
            return;
        }
        this.context.lineWidth = Number(target.value);
    }
}
