import { Component, Input, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-captions',
  templateUrl: './captions.component.html',
  styles: ['./captions.component.css']
})
export class CaptionsComponent  implements AfterViewInit{
memeSize: 500;
 img = document.getElementById('start-image');
 topText = document.getElementById('top-text');
 bottomText = document.getElementById('bottom-text');
@ViewChild('memeCanvas') memeCanvas: ElementRef;

private context: CanvasRenderingContext2D;

ngAfterViewInit() {
  const context = (this.memeCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
  this.drawMeme(context);
}

drawMeme(context) {
  this.topText.addEventListener('keydown', this.drawMeme);
  this.topText.addEventListener('keyup', this.drawMeme);
  this.topText.addEventListener('change', this.drawMeme);

  this.bottomText.addEventListener('keydown', this.drawMeme);
  this.bottomText.addEventListener('keyup', this.drawMeme);
  this.bottomText.addEventListener('change', this.drawMeme);

  function drawMeme() {


    this.context.drawImage(this.img, 200, 200, this.memeSize, this.memeSize);

    this.context.lineWidth = 4;
    this.context.font = '20pt sans-serif';
    this.context.strokeStyle = 'black';
    this.context.fillStyle = 'white';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';

    let text1 = document.getElementById('top-text');
    text1 = this.text1.toUpperCase();
    const x = this.memeSize / 2;
    const y = 350;

    wrapText(this.context, this.text1, this.x, this.y, 300, 28, false);

    this.context.textBaseline = 'bottom';
    let text2 = document.getElementById('bottom-text');
    text2 = this.text2.toUpperCase();
    this.y = this.memeSize;

    wrapText(this.context, text2, x, y, 300, 28, true);
  }
    function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {
      const pushMethod = (fromBottom) ? 'unshift' : 'push';
      lineHeight = (fromBottom) ? -lineHeight : lineHeight;

      const lines = [];
      let line = '';
      const words = text.split('');

      for (let n = 0; n < words.length; n++) {
        const testLine = line + ' ' + words[n];
        const metrics = this.context.measureText(testLine);
        const testWidth = this.metrics.width;

        if (testWidth > maxWidth) {
          lines[pushMethod](line);
          line = words[n] + '';
        } else {
          line = testLine;
        }
      }
      lines[pushMethod](line);
      // for ( let k in lines) {
      //   this.context.strokeText(lines[k], x, y + lineHeight * k);
      //  this.context.fillText(lines[k], x, y, + lineHeight * k);
      // }
    }
  }
}

