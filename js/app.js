export default class App {
    constructor({ canvas: HTMLCanvasElement }) {
        this.canvas = canvas;
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
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.handleCanvasClear.bind(this));
        }
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
            this.context.strokeStyle = 'black';
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
        this.context.lineWidth = Number(event.target.value);
    }
}
