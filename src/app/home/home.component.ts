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
    console.log(typeof(this.selectedImg));
    console.log(this.selectedImg.name);
    if (this.selectedImg && this.tags) {
      this.storageService.uploadMeme(this.selectedImg, this.tags + ' meme',
        null,
        (err) => { console.log(err); }, // @TODO actually handle the error
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
          null, // @TODO actually handle the error
          null);
    }
  }

  onImageSelected(e: any): void {
    if (e.target.files.length === 1) {
      this.selectedImg = e.target.files[0];
      if (this.imageSelected) {
        this.setupCanvas();
      }
      this.imageSelected = true;
    }
  }

  setupCanvas() {
    this.canvas = this.imgCanvas.nativeElement;
    const context = this.canvas.getContext('2d');
    const _this = this;

    // show rendered image to canvas
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.canvas.width = img.width;
        _this.canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(this.selectedImg);
  }

  ngOnInit() { }
}
