export class Mouse {
  public mouseClick = false;
  public mousePosition: { x: number, y: number };
  constructor(public canvas: HTMLCanvasElement) {
    //Mouse
    this.canvas.addEventListener('mousemove', (e) => this.mousePositionCallback(e));
    this.canvas.addEventListener('mousedown', (e) => this.mouseDownCallback(e));
    this.canvas.addEventListener('mouseup', (e) => this.mouseUpCallback(e));
  }
  mousePositionCallback(event: MouseEvent) {
    var canvasRect = this.canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - canvasRect.left - root.scrollLeft;
    var mouseY = event.clientY - canvasRect.top - root.scrollTop;
    var scale = 1;

    //Canvas Scale
    var st = window.getComputedStyle(this.canvas, null);
    var tr = st.getPropertyValue('transform');
    if (tr !== 'none') {
      var values = tr.split('(')[1].split(')')[0].split(',');
      var a: any = values[0];
      var b: any = values[1];
      var c: any = values[2];
      var d: any = values[3];

      scale = Math.sqrt(a * a + b * b);
    }
    this.mousePosition = { x: (mouseX / scale), y: (mouseY / scale) };
  }
  mouseDownCallback(event: MouseEvent) {
    this.mouseClick = true;
  }
  mouseUpCallback(event: MouseEvent) {
    this.mouseClick = false;
  }
}
