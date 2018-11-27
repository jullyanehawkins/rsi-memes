import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: '';
  images: any[];
  imageSelected = false;
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
  uploadButton;

  context: CanvasRenderingContext2D;
  @ViewChild('imgCanvas') imgCanvas;

  constructor(private storageService: StorageService,
    private imageService: ImageService,
    private router: Router) { }

  onImageSelected(e: any): void {
    const canvas = this.imgCanvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(200, 200, 350, 350);
    const _this = this;
    // show rendered image to canvas
    const render = new FileReader();
    render.onload = function(event) {
      const img = new Image();

      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        _this.origImage = img;
        _this.imageService.image = img;
        _this.imageSelected = true;
      };
      img.src = event.target.result;

    };
    render.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
    this.canvas = canvas;
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
  handleSuccess(response) {
    this.imagesFound = true;
    this.images = response.map(image => {
      return {
        id: image.id,
        // embed_url: image.embed_url,
        // title: image.title,
        url: image,
        // downsized_url: image.images.downsized.url
      };
    });
  }

  onUpload() {
    if (this.file && this.tags) {
      this.storageService.uploadMeme(this.file, this.tags + ' meme',
        null,
        (err) => { console.log(err); },
        () => { this.router.navigate(['/captions']); });
    }
    this.router.navigate(['/captions']);
  }
  ngOnInit() { }
}
