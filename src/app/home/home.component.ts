import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ImageHolderService } from '../image-holder.service';
import { Images } from '../image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private searchQuery: '';
  private images: any[];
  private url = '';
  private imageSelected = false;
  private selectedImg;
  private file;
  private tags: string;
  private canvas: any;
  private imgCanvas: ElementRef;
  @ViewChild('imgCanvas') set imageCanvas(imgCanvas: ElementRef) {
    if (imgCanvas) {
      this.imgCanvas = imgCanvas;
      this.setupCanvas();
    }
  }

  constructor(private storageService: StorageService,
    private imageHolder: ImageHolderService,
    private router: Router) { }

  //
  // img orientation - borrowed and adapted from people who are way smarter than I
  // https://github.com/blueimp/JavaScript-Load-Image/blob/master/js/load-image-meta.js
  getOrientation(file, callback) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const view = new DataView(e.target.result);

      // check for jpeg marker '0xffd8', return if not img
      if (view.getUint16(0, false) !== 0xFFD8) { return callback(-2); }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;

        // check for EXIF marker '0xFFE1'
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) { return callback(-1); }
          const little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) == 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }
        } else if ((marker & 0xFF00) != 0xFF00) {
          break;
        } else { offset += view.getUint16(offset, false); }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }

  handleSuccess(response) {
    this.images = response.map(image => {
      return {
        // id: image.id,
        // title: image.title,
        url: image,
      };
    });
  }

  onImageClicked(image: Images) {
    this.imageHolder.keepImage(image.url);
    this.router.navigate(['/captions']);
  }

  onUpload() {
    if (this.file && this.tags) {
      this.storageService.uploadMeme(this.file, this.tags + ' meme',
        null,
        (err) => { console.log(err); },
        () => {
          this.imageHolder.keepImage(this.canvas.toDataURL());
          this.router.navigate(['/captions']);
        });
    }
  }

  searchDatabase(query: string) {
    if (query) {
      return this.storageService
        .pullMemes(
          query,
          urls => this.handleSuccess(urls),
          null,
          null);
    }
  }

  onImageSelected(e: any): void {
    if (e.target.files.length === 1) {
      this.selectedImg = e.target.files[0];
      if (this.imageSelected) { this.setupCanvas(); }
      this.imageSelected = true;
    }
  }

  setupCanvas() {
    let imgOrientation = 1;
    this.canvas = this.imgCanvas.nativeElement;
    const context = this.canvas.getContext('2d');
    const _this = this;

    // this.getOrientation(this.file, function(orientation) {
    //   console.log('ORIENTATION :: ', orientation);
    //   imgOrientation = orientation;
    // });

    // show rendered image to canvas
    const reader = new FileReader();
    // reader.onload = onLoadFile;
    // reader.readAsDataURL(this.selectedImg);


    reader.onload = function(event) {
      const img = new Image();
      _this.selectedImg = img;
      img.onload = function() {
        context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.canvas.width = img.width;
        _this.canvas.height = img.height;
        context.drawImage(img, 0, 0);




        // context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        // let height = img.height, width = img.width;

        // if (imgOrientation > 4) {
        //   // these are rotated, swap width and height and calculate aspect ratio
        //   width = height;
        //   height = (width / _this.canvas.width) * _this.canvas.height;

        //   _this.canvas.attr({
        //     width: height,
        //     height: width
        //   });
        // } else {
        //   // these aren't rotated, so width and height remain normal
        //   _this.canvas.attr({
        //     width: width,
        //     height: height
        //   });
        // }

        // switch (imgOrientation) {
        //   case 1:
        //     // normal
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 2:
        //     // flip horizontal
        //     context.translate(width, 0);
        //     context.scale(-1, 1);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 3:
        //     // rotate 180
        //     context.translate(width, height);
        //     context.rotate(Math.PI);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 4:
        //     // flip vertical
        //     context.translate(0, height);
        //     context.scale(1, -1);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 5:
        //     // flip vertical, rotate 90 clockwise
        //     context.rotate(Math.PI / 2);
        //     context.scale(1, -1);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 6:
        //     // rotate 90 clockwise
        //     context.rotate(Math.PI / 2);
        //     context.translate(0, -height);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 7:
        //     // flip horizontal, rotate 90 counter clockwise
        //     context.rotate(Math.PI / 2);
        //     context.translate(width, -height);
        //     context.scale(-1, 1);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   case 8:
        //     // rotate 90 counter clockwise
        //     context.rotate(-Math.PI / 2);
        //     context.translate(-width, 0);
        //     context.drawImage(img, 0, 0, width, height);
        //     break;
        //   default:
        //     // normal
        //     context.drawImage(img, 0, 0, width, height);
        //     return;
        // }



      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(this.selectedImg);
  }

  ngOnInit() { }
}
