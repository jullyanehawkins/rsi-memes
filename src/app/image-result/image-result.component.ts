import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';
import { Images } from '../image';
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

  constructor(private imageService: ImageService, private storageService: StorageService) { }

  context: CanvasRenderingContext2D;
  @ViewChild('imgCanvas') imgCanvas;

  onSelectImage(e: any): void {
    let canvas = this.imgCanvas.nativeElement;
    let context = canvas.getContext('2d');
    context.clearRect(200, 200, 350, 350);

    // show rendered image to canvas
    let render = new FileReader();
    render.onload = function(event) {
      let img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        context.lineWidth = 4;
        context.font = '310pt sans-serif';
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'top';
    context.strokeText('Text', canvas.width / 2, canvas.height / 2);
      };
      img.src = event.target.result;
      console.log(e.target.files[0]);
    };
    render.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
  }
  onUpload() {
    this.storageService.upload(this.file,
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


