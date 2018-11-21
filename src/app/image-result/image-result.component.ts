import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';
import { Images } from '../image';
import { StorageService } from '../services/storage.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html'
})
export class ImageResultComponent implements OnInit {
  searchQuery: '';
  images: any[];
  imagesFound = false;
  searching = false;
  url = '';
  file;
  selectedImage = null;
  tags: string;
  topCaptions: string;
  bottomCaptions: string;
  canvas: any;
  origImage: any;
  constructor(private imageService: ImageService, private storageService: StorageService) { }

  context: CanvasRenderingContext2D;
  @ViewChild('imgCanvas') imgCanvas;

  onSelectImage(e: any): void {
    const canvas = this.imgCanvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(200, 200, 350, 350);
    const _this = this;
    // show rendered image to canvas
    const render = new FileReader();
    render.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        console.log('ONLOAD');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        _this.origImage = img;
      };
      img.src = event.target.result;

      console.log(e.target.files[0]);
    };
    render.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
    this.canvas = canvas;

  }
  updateCaptions(e) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height); // clearing canvas
    context.drawImage(this.origImage, 0, 0); // drawing originalImage on canvas

    const imageCenterX = this.canvas.width / 2; // image center
    context.strokeStyle = 'black'; // stroke color
    context.fillStyle = 'white'; // text color
    context.textAlign = 'center'; // draw text centered
    context.textBaseline = 'top'; // allign text with the top of coordinates


    if (this.topCaptions) { // draw only if defined and string length > 0

      // crazy formula to resize fontSize to fit text on image
      const fontSizeTop = Math.floor(this.canvas.height / (6 + 1.8 * Math.floor(this.topCaptions.length / 4)));
      context.font = `bold ${fontSizeTop}pt sans-serif`; // set font style for top drawing
      context.lineWidth = fontSizeTop / 6; // text stroke line width
      const textYTopOffset = 0.2 * fontSizeTop; // offset space from top
      context.strokeText(this.topCaptions, imageCenterX, textYTopOffset); // draw only the outline stroke text (black)
      context.fillText(this.topCaptions, imageCenterX, textYTopOffset); // then draw the filled text (white)
    }


    if (this.bottomCaptions) { // draw only if defined and string length > 0
      // same crazy formula
      const fontSizeBottom = Math.floor(this.canvas.height / (6 + 1.8 * Math.floor(this.bottomCaptions.length / 4)));
      context.font = `bold ${fontSizeBottom}pt sans-serif`;
      context.lineWidth = fontSizeBottom / 6;
      const textBottomYOffset = this.canvas.height - 1.4 * fontSizeBottom;
      context.strokeText(this.bottomCaptions, imageCenterX, textBottomYOffset);
      context.fillText(this.bottomCaptions, imageCenterX, textBottomYOffset);
    }
  }
  onUpload() {
    console.log(this.tags);
    this.storageService.upload(this.file, this.tags,
      (res) => { console.log(res); },
      (err) => { console.log(err); },
      null); // route to another page
  }
  handleSuccess(response) {
    this.imagesFound = true;
    this.images = response.data.map(image => {
      return {
        id: image.id,
        embed_url: image.embed_url,
        title: image.title,
        url: image.url,
        downsized_url: image.images.downsized.url
      };
    });
    console.log(this.images);
  }

  handleError(error) {
    console.log(error);
  }
  onSubmit(query: string) {
    this.searching = true;
    return this.imageService
      .getImage(query)
      .subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
        () => (this.searching = false)
      );
  }
  ngOnInit() { }
}

