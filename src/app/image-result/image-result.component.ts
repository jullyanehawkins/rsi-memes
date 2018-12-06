import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';


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

  constructor(private storageService: StorageService) { }

  context: CanvasRenderingContext2D;
  @ViewChild('imgCanvas') imgCanvas;

  handleSuccess(response) {
    this.imagesFound = true;
    this.images = response.map(image => {
      return {
        url: image,
      };
    });
  }

  onImageSelected(e: any): void {
    const canvas = this.imgCanvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const _this = this;
    // show rendered image to canvas
    const render = new FileReader();
    render.onload = function(event) {
      const img = new Image();
    };
  }

  onUpload() {
    if (this.file && this.tags) {
      this.storageService.uploadMeme(this.file, this.tags + ' meme',
        null,
        (err) => { console.log(err); },
        null); // route to another page
    }
  }
  searchDatabase(query: string) {
    if (query) {
      return this.storageService
        .pullMemes(
          query,
          urls => this.handleSuccess(urls),
          null,
          () => (this.searching = false));
    }
  }
  ngOnInit() {

  }
}
