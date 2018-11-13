import { Component, Input, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-captions',
  templateUrl: './captions.component.html',
  styles: ['./captions.component.css']
})
export class CaptionsComponent implements AfterViewInit {

//   // Reference to the canvas element from our template
//   @ViewChild('memeCanvas') public memeCanvas: ElementRef;
//   // setting a width & height for the canvas
//   // @Input() public width = 512;
//   // @Input() public height = 418;
//   memeSize: 300;

//   private cx: CanvasRenderingContext2D;
//   typingSubscription: Subscription;

//   img = document.getElementById('start-image');
//   topText = document.getElementById('top-text');
//   bottomText = document.getElementById('bottom-text');

//   constructor() {}

//   public ngAfterViewInit() {
//     // get the context.
//     const canvasEl: HTMLCanvasElement = this.memeCanvas.nativeElement;
//     this.cx = canvasEl.getContext('2d');

//     // set the width and height
//     canvasEl.width = this.memeSize;
//     canvasEl.height = this.memeSize;

//     this.img.onload = function() {
//       drawMeme();
//     }

//     this.topText.addEventListener('keydown', drawMeme),
//     this.topText.addEventListener('keyup', drawMeme),
//     this.topText.addEventListener('change', drawMeme);

//     this.bottomText.addEventListener('keydown', drawMeme),
//     this.bottomText.addEventListener('keyup', drawMeme),
//     this.bottomText.addEventListener('change', drawMeme);

//     function drawMeme() {
//       this.cx.clearRect(0, 0, canvasEl.width, canvasEl.height);

//       this.cx.drawImage(this.img, 0, 0, 300, 300);
//       this.cx.lineWidth = 4;
//       this.cx.font = '20pt sans-serif';
//       this.cx.strokeStyle = 'black';
//       this.cx.fillStyle = 'white';
//       this.cx.textAlign = 'center';
//       this.cx.textBaseline = 'top';

//       let text1 = document.getElementById('top-text').value;
//       text1 = text1.toUpperCase();
//       let x = memeSize / 2;
//       let y = 0;

//       wrapText(this.cx, text1, x, y, 300, 28, false);

//       this.cx.textBaseline = 'bottom';
//       let text2 = document.getElementById('bottom-text').value;
//       text2 = text2.toUpperCase();
//       y = memeSize;

//       wrapText(this.cx, text2, x, y, 300, 28, true);
//     }
//     function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {
//       let pushMethod = (fromBottom) ? 'unshift' : 'push';

//       lineHeight = (fromBottom) ? -lineHeight : lineHeight;
//       let lines = [];
//       let y = y;
//       let line = '';
//       let words = text.split(' ');

//       for ( let n = 0; n < words.length; n++) {
//         let testLine = line + ' ' + words[n];
//         let metrics = context.measureText(testLine);
//         let testWidth = metrics.width;

//         if (testWidth > maxWidth) {
//           lines[pushMethod](line);
//           line = words[n] + ' ';
//         } else {
//           line = testLine;
//         }
//       }
//       lines[pushMethod](line);
//       // tslint:disable-next-line:forin
//       for (const k in lines) {
//         context.strokeText(lines[k], x, y + lineHeight * k);
//         context.fillText(lines[k], x, y + lineHeight * k);
//       }
//     }
//    }
  }
