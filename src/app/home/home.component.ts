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
    public searching: boolean;
    @ViewChild('imgCanvas') set imageCanvas(imgCanvas: ElementRef) {
    if (imgCanvas) {
    this.imgCanvas = imgCanvas;
    this.setupCanvas();
    }
    }
  constructor(
    private storageService: StorageService,
    private imageHolder: ImageHolderService,
    private router: Router
  ) {}

  context: CanvasRenderingContext2D;

  onImageSelected(e: any): void {
    if (e.target.files.length === 1) {
    this.selectedImg = e.target.files[0];
    if (this.imageSelected) { this.setupCanvas(); }
    this.imageSelected = true;
    }
    this.imageHolder.keepImage(this.canvas.toDataURL());
          this.router.navigate(['/captions']);
  }
  imageClicked(e: any) {
    this.imageHolder.keepImage(e.target.src);
    this.router.navigate(['/captions']);
  }

  searchDatabase(query: string) {
    if (query) {
      return this.storageService.pullMemes(
        query,
        urls => this.handleSuccess(urls),
        null,
        () => (this.searching = false)
      );
    }
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
  onUpload() {
    if (this.file && this.tags) {
      this.storageService.uploadMeme(
        this.file,
        this.tags + ' meme',
        null,
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/captions']);
        }
      );
    }
    this.imageHolder.keepImage(this.canvas.toDataURL());
    this.router.navigate(['/captions']);
  }

  setupCanvas() {
    this.canvas = this.imgCanvas.nativeElement;
    const context = this.canvas.getContext('2d');
    const _this = this;
    // show rendered image to canvas
    const reader = new FileReader();
    reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
    context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
    _this.canvas.width = img.width;
    _this.canvas.height = img.height;
    context.drawImage(img, 0, 0);
    _this.selectedImg = img;
    };
    img.src = event.target.result;
    console.log(img.src);
    };
    reader.readAsDataURL(this.selectedImg);
    }

  ngOnInit() {}
}
