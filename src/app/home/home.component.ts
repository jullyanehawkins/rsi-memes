import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('imgCanvas') imgCanvas;
  searchQuery: '';
  images: any[];
  imageSelected = false;
  url = '';
  file;
  tags: string;
  canvas: any;
  origImage: HTMLImageElement;

  constructor(private storageService: StorageService,
    private imageHolder: ImageHolderService,
    private router: Router) { }

  onImageClicked(image: Images) {
    console.log(image);
    this.imageHolder.keepImage(image.url);
    this.router.navigate(['/captions']);
  }

  onImageSelected(e: any): void {
    if (e.target.files.length > 0) {
      const canvas = this.imgCanvas.nativeElement;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      const _this = this;
      // show rendered image to canvas
      const render = new FileReader();
      render.onload = function(event) {

        const img = new Image();
        img.onload = function() {
          _this.imageSelected = true;
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          _this.origImage = img;
        };
        img.src = event.target.result;
      };
      render.readAsDataURL(e.target.files[0]);
      this.file = e.target.files[0];
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

  handleSuccess(response) {
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
        () => {
          this.imageHolder.keepImage(this.canvas.toDataURL());
          this.router.navigate(['/captions']);
        });
    }
  }

  ngOnInit() { }
}
