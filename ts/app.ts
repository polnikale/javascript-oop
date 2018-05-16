interface IApp {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  closeBtn: Element | null;
  changeBrushWidthInput: HTMLInputElement | null;
  isDrawing: Boolean;
  lastEvent?: Event; 

  handleCanvasMousedown(event: MouseEvent): void;
  handleCanvasMousemove(event: MouseEvent): void;
  handleCanvasMouseup(event: MouseEvent): void;
  handleCanvasMouseleave(event: MouseEvent): void;
  handleCanvasClear(event: MouseEvent): void;
  handleBrushSizeChange(event: MouseEvent): void;

}

export default class App implements IApp {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  closeBtn!: Element | null;
  changeBrushWidthInput!: HTMLInputElement | null;
  isDrawing: Boolean;
  lastEvent?: MouseEvent;

  constructor({canvas}: {canvas: HTMLCanvasElement}) {
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
    this.changeBrushWidthInput = document.querySelector('#brush-size-slider');
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', this.handleCanvasClear.bind(this));
    }
    if (this.changeBrushWidthInput) {
      this.changeBrushWidthInput.addEventListener('change', this.handleBrushSizeChange.bind(this));
    }
  }

  handleCanvasMousedown(event: MouseEvent) {
    this.lastEvent = event;
    this.isDrawing = true;
  }

  handleCanvasMousemove(event: MouseEvent) {
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

  handleCanvasMouseup(event: MouseEvent) {
    this.isDrawing = false;
  }

  handleCanvasMouseleave(event: MouseEvent) {
    this.isDrawing = false;
  }

  handleCanvasClear(event: MouseEvent) {
    if (!this.context) {
      return;
    }
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleBrushSizeChange(event: MouseEvent) {
    if (!this.context || !event.target) {
      return;
    }
    this.context.lineWidth = Number(event.target.value); //ошибку показывает TS, не знаю как пофиксить
  }
}
